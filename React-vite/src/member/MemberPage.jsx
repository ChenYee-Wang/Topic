import React, { useState, useEffect } from "react";
import "./member.css";
import useAuthContext from "../context/AuthContext";
import memberPhoto from "./img/member-photo.gif";
import design from "./img/design.jpg";
import loaDing from "../loading.gif";
import axios from "../api/axios";


function MemberPage() {

  const { user, loading } = useAuthContext();
  const [organize_activities, setorganizeActivities] = useState([]);
  const [join_activities, setjoinActivities] = useState([]);
  const [favorite_activities, setfavoriteActivities] = useState([]);
  const [memberInfo, setMemberInfo] = useState(user);

  useEffect(() => {
    setMemberInfo(user);
  }, [user]);

  // ------------------------------------------------------------舉辦活動
  useEffect(() => {
    async function getActivity() {
      try {
        const response = await axios.get("api/organizeActivities");
        // console.log(response.data);
        setorganizeActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getActivity();
  }, []);

  // ------------------------------------------------------------參與活動
  useEffect(() => {
    async function getActivity() {
      try {
        const response = await axios.get("api/joinActivities");
        // console.log(response.data);
        setjoinActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getActivity();
  }, []);

  // ------------------------------------------------------------收藏活動
  useEffect(() => {
    async function getActivity() {
      try {
        const response = await axios.get("api/favoriteActivities");
        // console.log(response.data);
        setfavoriteActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getActivity();
  }, []);






  


  // const handleDelete = async () => {
  //   try {
  //     const response = await axios.delete(`api/favoriteActivities/${user.id}`);
  //     console.log(response.data);
  //     // update the state after deleting the item
  //     setfavoriteActivities(
  //       favorite_activities.filter((activity) => activity.id !== user.id)
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  









  // ------------------------------------------------------------時間格式
  function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }



  if (loading) {
    return <div className="center"><img src={loaDing} alt="" /></div>;
  }

  return user ? (
    <div className="member-body">
      <h1>會員頁面</h1>
      <form>
        <div className="member-intro">
          <div>
            <img src={memberInfo?.member_avatar} className="member-photo" />
          </div>
          <div style={{ textAlign: "left" }}>
            <span>姓名：</span>
            <span
              name="memberName"
              className="member-input"
              size={10}
            >
              {memberInfo?.name}
            </span>
            <br />
            <br />
            <br />
            <span style={{ marginTop: 20 }}>生日：</span>
            <span
              name="memberName"
              className="member-input"
              size={10}
            >
              {memberInfo?.member_birth}
            </span>
          </div>
        </div>
      </form>
      <div className="member-tab">
        {/* introduction tab start */}
        <input id="tab1" type="radio" name="tab" defaultChecked="checked" />
        <label className="member-label" htmlFor="tab1">
          簡介
        </label>
        <form className="member-form-content">
          <div style={{ width: "max-content", margin: "0 auto" }}>
            <p className="member-title">
              姓　　名：
              <input
                defaultValue={memberInfo?.name}
                className="introduction-input"
                readOnly
              />
            </p>
            <p className="member-title">
              電話號碼：
              <input
                defaultValue={memberInfo?.member_phone}
                className="introduction-input"
                readOnly
              />
            </p>
            <p className="member-title">
              電子信箱：
              <input
                defaultValue={memberInfo?.email}
                className="introduction-input"
                readOnly
              />
            </p>
            <p className="member-title">
              居住城市：
              <input
                defaultValue={memberInfo?.member_county}
                className="introduction-input"
                readOnly
              />
            </p>
            <p className="member-title">
              出生日期：
              <input
                style={{ width: 170 }}
                className="introduction-input"
                defaultValue={memberInfo?.member_birth}
                readOnly
              />
            </p>
            <div className="member-title" style={{ width: "365.8px" }}>
              <label style={{ position: "relative" }}>性　　別：</label>
              <input
                className="introduction-input"
                defaultValue={memberInfo?.member_sex}
                readOnly
              />
            </div>
            <p></p>
            <p className="member-title">自我介紹：</p>
            <textarea
              readOnly
              name="memberName"
              className="introduction-textarea"
              defaultValue={memberInfo?.member_introduction}
            />
            <p />
            <a href="/memberEdit">
              <input
                type="button"
                name="introductionSubmit"
                defaultValue="編輯"
                className="introduction-submit"
              />
            </a>
          </div>
        </form>
        {/* introduction tab end */}



























        {/* organise_event tab start */}
        <input id="tab2" type="radio" name="tab" />
        <label className="member-label" htmlFor="tab2">
          發起活動
        </label>
        <form className="member-form-content">



          {organize_activities.map((activity) => {
            // console.log(user.id);
            // console.log(organize_activities[2].id);
            // console.log(activity.id);
            if(user.id === activity.id){
            return  (
              <div className="organise-content">
                <div>
                  <img src={design} className="organise-photo" />
                </div>
                <div>
                  <span>活動名稱：</span>
                  <input
                    type="text"
                    name="organiseName"
                    defaultValue={activity.activity_name}
                    className="organise-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span>活動地點：</span>
                  <input
                    type="text"
                    name="organiseName"
                    defaultValue={activity.activity_place}
                    className="organise-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span style={{ position: "relative" }}>
                    活動日期：
                  </span>
                  <input
                    type="datetime"
                    name="organiseName"
                    defaultValue={formatDate(activity.activity_partyTime)}
                    className="organise-sub"
                    size={10}
                    readOnly
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <a className="organise-submit" href={`/review/${activity.activity_id}`}>
                    審核
                  </a>
                </div>

              </div>
              

            );
          }
          })}
        </form>
        {/* organise_event tab end */}





























        {/* campaign tab start */}
        <input id="tab3" type="radio" name="tab" />
        <label className="member-label" htmlFor="tab3">
          參加活動
        </label>









        <form className="member-form-content">
          {join_activities.map((activity) => {
            if(user.id === activity.id){
            return (
              <div className="campaign-content" >
                <div>
                  <img src={design} className="campaign-photo" />
                </div>
                <div>
                  <span>活動名稱：</span>
                  <input
                    type="text"
                    name="campaignName"
                    defaultValue={activity.activity_name}
                    className="campaign-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span>活動地點：</span>
                  <input
                    type="text"
                    defaultValue={activity.activity_place}
                    className="campaign-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span style={{ position: "relative" }}>活動日期： </span>
                  <input
                    type="date"
                    defaultValue={formatDate(activity.activity_partyTime)}
                    className="campaign-sub"
                    size={10}
                    readOnly
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type="button"
                    // defaultValue="審核中"
                    defaultValue={activity.join_state}
                    className={activity.join_state === "未通過"? "campaign-unpass"
                             : activity.join_state === "已通過"? "campaign-pass"
                                                               : "campaign-review"}
                  // className="campaign-review"
                  />
                  <input
                    type="button"
                    value="取消報名"
                    className="campaign-cancel"
                  />
                </div>
              </div>
            );
            }
          })}
        </form>
        {/* campaign tab end */}


























































        {/* collect tab start */}
        <input id="tab4" type="radio" name="tab" />
        <label className="member-label" htmlFor="tab4">
          收藏
        </label>
        <form className="member-form-content">


          {favorite_activities.map((activity) => {
            if(user.id === activity.id){
            return (
              <div className="collect-content">
                <div>
                  <img src={design} className="collect-photo" />
                </div>
                <div>
                  <span>活動名稱：</span>
                  <input
                    type="text"
                    name="collectName"
                    defaultValue={activity.activity_name}
                    className="collect-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span>活動地點：</span>
                  <input
                    type="text"
                    name="collectName"
                    defaultValue={activity.activity_place}
                    className="collect-sub"
                    size={10}
                    readOnly
                  />
                  <br />
                  <span style={{ position: "relative", left: 7 }}>活動日期： </span>
                  <input
                    type="date"
                    name="collectName"
                    defaultValue={formatDate(activity.activity_partyTime)}
                    className="collect-sub"
                    size={10}
                    readOnly
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type="button"
                    defaultValue="取消收藏"
                    className="collect-cancel"
                    // onClick={handleDelete}
                  />
                </div>
              </div>

            );
            }
          })}


        </form>
        {/* collect tab end */}
      </div >
    </div >
  ) : (
    <Navidate to="/" />
  );
}

export default MemberPage;
