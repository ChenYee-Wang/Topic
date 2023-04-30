import React from "react";
import { Navigate } from "react-router-dom";
import "./style1.css";
import useAuthContext from "../context/AuthContext";
import loaDing from "/src/loading.gif";
import { useState } from "react";
import { useEffect } from "react";

function Activity1() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="center">
        <img src={loaDing} alt="" />
      </div>
    );
  }
  // 聚會類型
  const storedValue = sessionStorage.getItem('活動類型');
  const [isActive, setIsActive] = useState(storedValue ? JSON.parse(storedValue) : Array(14).fill(false));
  const activities = [
    { id: 1, icon: "🍿", label: "電影" },
    { id: 2, icon: "🎲", label: "桌游" },
    { id: 3, icon: "🍴", label: "聚餐" },
    { id: 4, icon: "📖", label: "閱讀" },
    { id: 5, icon: "🚶", label: "運動" },
    { id: 6, icon: "🛍", label: "購物" },
    { id: 7, icon: "🎨", label: "彩繪" },
    { id: 8, icon: "🏋️‍♀️", label: "健身" },
    { id: 9, icon: "🍲", label: "烹飪" },
    { id: 10, icon: "🚗", label: "旅遊" },
    { id: 11, icon: "🍺", label: "酒吧" },
    { id: 12, icon: "🎵", label: "音樂" },
    { id: 13, icon: "🧺", label: "野餐" },
    { id: 14, icon: "🍻", label: "聚會" },
  ];

  useEffect(() => {
    sessionStorage.setItem("活動類型", JSON.stringify(isActive));
  }, [isActive]);

  function handleClick(event) {
    setIsActive((prevState) => {
      const newState = [...prevState];
      newState[event] = !newState[event];
      return newState;
    });
  }
  
  //點擊預設圖片
  const [defaultImg, setdefaultImg] = useState(
    sessionStorage.getItem("預設圖片") || ""
  );

  function handleImgClick(event) {
    setdefaultImg(event.target.src);
    sessionStorage.setItem("預設圖片", event.target.src);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageData = reader.result;
      // console.log(reader.result)
      sessionStorage.setItem("預設圖片", imageData);
    };
  };

  //限制文字輸入字數
  const MAX_LENGTH = 300;
  const [activityText, setactivityText] = useState(
    sessionStorage.getItem("活動簡述") || ""
  );

  function handleInputChange(event) {
    let newText = event.target.value;
    if (newText.length <= MAX_LENGTH) {
      setactivityText(newText);
      sessionStorage.setItem("活動簡述", event.target.value);
    }
  }

  //取得活動名稱的值
  const [activityName, setActivityName] = useState(
    sessionStorage.getItem("活動名稱") || ""
  );

  function handleActivityNameChange(event) {
    setActivityName(event.target.value);
    sessionStorage.setItem("活動名稱", event.target.value);
  }

  return user ? (
    <div className="activity_container">
      <div className="progressBar">
        <div className="progress11">1. 活動畫面</div>
        <div className="progress21">2. 細項資料</div>
        <div className="progress31">3. 預覽</div>
      </div>
      <main className="activity_main">
        <div className="meetType">
          <div className="activity_title">聚會類型 : </div>
          <div className="tagBox">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`test ${isActive[index] ? "tagAfter" : "tag"}`}
                onClick={() => handleClick(index)}
                >
                {activity.icon} {activity.label}
              </div>
            ))}
          </div>
        </div>
        <div className="activityUpload">
          <div className="activity_title">
            <label htmlFor="">
              活動名稱 :
              <input
                type="text"
                className="activityName"
                onChange={handleActivityNameChange}
                value={activityName}
                required
              />
            </label>
          </div>
          <textarea
            name=""
            id="activityText"
            placeholder="請簡述活動內容，300字以內"
            className="activityText"
            defaultValue={activityText}
            onChange={handleInputChange}
            maxLength={MAX_LENGTH}
            required
          />
        </div>
        <div className="imageUpload">
          <div className="activity_title">上傳圖片 : </div>
          <label htmlFor="fileInput" className="fileLabel">
            <span className="fileSpan">➕</span>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="fileInput"
              required=""
              onClick={handleImageUpload}
            />
          </label>
          <div className="imageDefault">
            <span className="arrowButton">◀</span>
            <div className="imageBox">
              <img
                src="https://i0.wp.com/www.tripresso.com/blog/wp-content/uploads/2021/02/7.jpeg?resize=640%2C360"
                alt="1"
                onClick={handleImgClick}
              />
              <img
                src="https://i0.wp.com/www.tripresso.com/blog/wp-content/uploads/2021/02/7.jpeg?resize=640%2C360"
                alt="2"
                onClick={handleImgClick}
              />
              <img
                src="https://i0.wp.com/www.tripresso.com/blog/wp-content/uploads/2021/02/7.jpeg?resize=640%2C360"
                alt="3"
                onClick={handleImgClick}
              />
            </div>
            <span className="arrowButton">▶</span>
          </div>
        </div>

        <div className="buttonControl-one">
          {/* <div class="button">上一頁</div> */}
          <a className="button" href="/activity2">
            下一頁
          </a>
        </div>
      </main>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Activity1;
