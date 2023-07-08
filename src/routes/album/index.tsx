import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import animation from "./animation.module.css";
import { CSSTransition } from "react-transition-group";
import { useCallback, useState } from "react";
import Banner from "@/components/Banner";
import Scroll from "@/components/Scroll";
import SongList from "@/components/songList";
import { getCount } from "@/utils/utils";
import classNames from "classnames";
import useMount from "@/hooks/useMount";
import { getAlbumDetailRequest } from "@/api/request";
import { AlbumDetailType } from "@/api/types";
import Loading from "@/baseUI/Loading";

const Album: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [albumDetail, setAlbumDetail] = useState<AlbumDetailType>({} as AlbumDetailType);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleBack = useCallback(() => {
    setShow(false);
  }, []);

  useMount(async () => {
    const res = await getAlbumDetailRequest(params.id!);

    setAlbumDetail(res);
    setLoading(false);
  });

  return (
    <CSSTransition
      in={show}
      timeout={300}
      unmountOnExit
      classNames={{
        appear: animation.flyAppear,
        appearActive: animation.flyAppearActive,
        enter: animation.flyEnter,
        enterActive: animation.flyEnterActive,
        exit: animation.flyExit,
        exitActive: animation.flyExitActive,
      }}
      appear={true}
      onExited={() => navigate(-1)}
    >
      <div className={styles.album}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Banner onClick={handleBack} />
            <Scroll>
              <header className={styles.header}>
                <div className={styles.background} style={{ backgroundImage: `url(${albumDetail.coverImgUrl})` }}></div>

                <div className={styles.albumContainer}>
                  <div className={styles.coverWrapper}>
                    <div className={styles.decorate}>
                      <i className="iconfont play">&#xe885;</i>
                      <span className={styles.count}>{Math.floor(albumDetail.subscribedCount / 1000) / 10} 万 </span>
                    </div>
                    <img src={albumDetail.coverImgUrl} alt="cover" />
                  </div>
                  <div className={styles.albumDesc}>
                    <div className={styles.albumDescTitle}>{albumDetail.name}</div>
                    <div className={styles.albumDescPerson}>
                      <img className={styles.avatar} src={albumDetail.creator.avatarUrl}></img>
                      <span className={styles.songer}>{albumDetail.creator.nickname}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.menu}>
                  <div className={styles.menuItem}>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                  </div>
                  <div className={styles.menuItem}>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                  </div>
                  <div className={styles.menuItem}>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                  </div>
                  <div className={styles.menuItem}>
                    <i className="iconfont">&#xe606;</i>
                    更多
                  </div>
                </div>
              </header>

              <main className={styles.main}>
                <div className={styles.firstLine}>
                  <div className={styles.playAll}>
                    <i className={classNames("iconfont", styles.icon)}>&#xe6e3;</i>
                    <div>
                      <span>播放全部</span>
                      <span className={styles.num}>（共 {albumDetail.tracks.length} 首）</span>
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <i className="iconfont">&#xe62d;</i>
                    <span> 收藏 ({getCount(albumDetail.subscribedCount)})</span>
                  </div>
                </div>
                <SongList list={albumDetail.tracks} />
              </main>
            </Scroll>
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default Album;
