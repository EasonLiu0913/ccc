import React, { useEffect, useState } from 'react'
import { productList } from './ProductList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './css/mao.scss'
import {
  getShopCart,
  AddCart,
  AddCartNewItem,
  CalShopCart,
  Handle_AddMyFavorite,
  AddCartNewItem_sendcal,
} from './actions/ShopCartAction'
import Slider from 'react-slick'
import { FiShoppingBag ,FiHeart} from 'react-icons/fi';

function ProductSlide(props) {



  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows:true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  let RealCart = []
  let checkBox = []
  props.AddItem.map((v, i) => {
    RealCart.push(v)
    checkBox.push(v.pId)
  })
  useEffect(() => {
    props.getShopCart()
  }, [])

  function checkCart(val) {
    
    let index = checkBox.findIndex(e => e == val.pId)
    if (index == -1) {
      val.count=1
      RealCart.push(val)
    }else{
      RealCart.map((v, i) => {
        if (val.pId == v.pId) {
          v.count=+v.count+1
        }
    })
  }
    props.AddCartNewItem_sendcal(RealCart)
  }
  

  console.log(props)

  const productItem = productList.map((v, i) => {
    return (
      <>
        <div className="card Mao-prodctSlide-card-box ">
          <img
            className="Mao-img"
            src="https://fakeimg.pl/150/"
            alt="..."
          />
          <h4 className="card-title">{v.pName}</h4>
          <p>${v.price}</p>
          <button
            className="Mao-prodctSlide-card-btn-add"
            onClick={() => {
              let productInfo = {
                pId: v.pId,
                price: v.price,
                count:0,
                itemCategoryId: v.itemCategoryId,
                name: v.name,
              }
              checkCart(productInfo)
            }}
          >
            <FiShoppingBag class="mx-2"/><span>加入購物車</span>
          </button>

          <button
            className="Mao-prodctSlide-card-btn-like"
            onClick={() => {
              let productInfo = {
                pId: v.pId,
                price: v.price,
                itemCategoryId: v.itemCategoryId,
                name: v.name,
              }
              props.Handle_AddMyFavorite('true', productInfo, props.MyFavorite)
            }}
          >
            <FiHeart className="mr-2"/>
            <span className="ml-1">我的最愛</span>
          </button>
        </div>
      </>
    )
  })
  return (
    <>
      <div
        className="bg-white p-2 my-5"
        style={{ width: '1300px' }}
      >
      <Slider {...settings}>
        {productItem}
      </Slider>
      </div>
    </>
  )
}

// 告訴redux該怎麼對應它的store中的state到這個元件的props的哪裡

const mapStateToProps = store => {
  return {
    data: store.getShop,
    AddItem: store.AddItem,
    calculator: store.calculator,
    MyFavorite: store.MyFavorite,
  }
}

//action
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getShopCart,
      AddCart,
      CalShopCart,
      Handle_AddMyFavorite,
      AddCartNewItem_sendcal,
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSlide)
)
