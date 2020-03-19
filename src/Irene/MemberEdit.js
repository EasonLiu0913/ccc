import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { Form, ListGroup, Button } from 'react-bootstrap'
// import MemberSidebar from './components/MemberSidebar'
import './I_css/MemberEdit.scss'
import MemberSidebar from './components/MemberSidebar'
import MemberOrder from './MemberOrder'
import MemberCollection from './MemberCollection'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getserverMember } from './actions/memberAction'

function MemberEdit(props) {
  console.log(props)
  console.log(props.data.Name)
  //遇到資料undefined時解法
  let imgUrl = props.data[0] ? props.data[0].Name : ''
  useEffect(() => {
    props.getserverMember()
  }, [])
  return (
    <>
      <Switch>
        <Route path="/memberedit/memberorder">
          <MemberOrder />
        </Route>
        <Route path="/memberedit/membercollection">
          <MemberCollection />
        </Route>
        {/* //最後要新增一頁，如果路由不對要顯示頁面錯誤然後跳轉。 
    <Route path="*">
          <PageNitFound />
        </Route> */}

        <div className="row d-flex justify-content-center">
          <MemberSidebar />
          {/* 會員資料編輯內容 */}
          <div className="memberedit col-9">
            <h3>基本資料管理</h3>
            <hr />
            <Form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">帳號</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readonly
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={imgUrl}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">電子信箱</label>
                <div className="col-sm-4">
                  <input type="email" className="form-control" id="" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">密碼</label>
                <div className="col-sm-4">
                  <input type="password" className="form-control" id="" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">姓名</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" id="" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">性別</label>
                <div className="col-sm-10">
                  <select className="custom-select col-sm-4" required>
                    <option selected value="">
                      男
                    </option>
                    <option value="">女</option>
                    <option value="">不便告知</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">生日</label>
                <div className="col-sm-4">
                  <input type="date" className="form-control" id="" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">地址 </label>
                <div className="col-sm-10">
                  <select className="custom-select col-sm-4" required>
                    <option selected value="">
                      台北市
                    </option>
                  </select>
                  <select className="custom-select col-sm-4" required>
                    <option selected value="">
                      大安區
                    </option>
                  </select>
                  <div>
                    <input type="text" className="col-sm-8 form-control" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button className="Irene_submit" type="submit">
                  更新
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Switch>
    </>
  )
}

// 選擇對應的reducer
const mapStateToProps = store => {
  return { data: store.getMemberID }
}

//action
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getserverMember,
    },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MemberEdit)
)
