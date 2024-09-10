import React from 'react'
import Tag from '../../common/Tag/Tag'
import MusicTab from '../../common/MusicTab/MusicTab'
import "./UserPage.style.css"

const UserPage = () => {
  return (
    <div className="user-page">
      <div className="header-container">
        <h1>내 라이브러리</h1>
        <div className="header-info">
          <span>최근</span>
          <span>추가한 날짜</span>
        </div>
      </div>

      <div className="music-libary">
        <div className="tags">
          <Tag label={"플레이리스트"} />
          <Tag label={"아티스트"} />
          <Tag label={"앨범"} />
          <Tag label={"팟캐스트 및 프로그램"} />
        </div>

        <div className="music-list">
          <MusicTab title="좋아요 표시한 곡" type="플레이리스트 • 9곡" time="2주 전" />
          <MusicTab title="내 에피소드" type="저장한 또는 다운로드한 에피소드" time="6일 전" />
          <MusicTab title="Queen Of Tears OST" type="2024년 6월 12일" time="6일 전" />
          <MusicTab title="검정치마" type="아티스트" time="2시간 전" />
          <MusicTab title="This Is 콜" type="플레이리스트 • Spotify" time="3시간 전" />
          <MusicTab title="괜찮아 사랑이야 OST" type="플레이리스트 • Vika" time="4시간 전" />
          <MusicTab title="또 오해영 OST" type="플레이리스트 • Wonnie Park" time="5시간 전" />
        </div>
      </div>
    </div>
  )
}

export default UserPage
