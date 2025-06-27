import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import moment from "moment";
import { getFirestore, updateDoc, doc, onSnapshot } from "firebase/firestore";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import BasicModal from "../basic-model";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
const language = "en";

function Media(props) {
  const navigate = useNavigate();
  const { loading, data, uid, likeHandler } = props;
  const isLiked = data?.like?.includes(uid);

  console.log("------isliked------->", isLiked);
  //   console.log("-----UserData----->>>>>>", data);
  //   console.log("-----uid----->>>>>>", uid);
  return (
    <Card style={{ width: "100%" }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt={data?.name} src={data?.profileURL} />
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            data.name
            // username
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            moment(data?.createdAt).fromNow()
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
      ) : (
        <div style={{ padding: "0px 10px" }} className="media">
          {data?.fileType === "image" ? (
            <CardMedia
              // style={{ borderRadius: "10px" }}
              component="img"
              width={"100%"}
              height={"100%"}
              image={data?.fileURL}
            />
          ) : (
            <ReactPlayer
              // style={{ borderRadius: "10px" }}
              width={"100%"}
              height={"100%"}
              controls={true}
              url={data?.fileURL}
            />
          )}
        </div>
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            component="p"
            className="title"
            // sx={{ color: "text.secondary" }}
          >
            {data?.blogTitle}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              // style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            component="p"
            className="blogDetails"
            sx={{ color: "text.secondary" }}
          >
            {data?.blogDetails}
          </Typography>
        )}
      </CardContent>
      <div className="card-footer">
        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={8}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={60} width={40} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
              <Button
                variant="contained"
                disableElevation
                className="like-btn"
                onClick={likeHandler}
              >
                {isLiked ? (
                  <ThumbUpIcon style={{ color: "#1976d2" }} />
                ) : (
                  <ThumbUpOutlinedIcon className="icon" />
                )}

                <p className="paragraphTag">
                  {Intl.NumberFormat(language, { notation: "compact" }).format(
                    data?.like?.length
                  )}
                </p>
              </Button>
            </div>
          )}
        </CardContent>

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={8}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={60} width={40} />
            </React.Fragment>
          ) : (
            <div className="footer-box">
              <ChatBubbleOutlineOutlinedIcon className="icon" />
              <p className="paragraphTag" id="comntParag">
                {Intl.NumberFormat(language, { notation: "compact" }).format(
                  data?.comment?.length
                )}
              </p>
            </div>
          )}
        </CardContent>

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={8}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={60} width={40} />
            </React.Fragment>
          ) : (
            <div className="footer-box" id="footerBox">
              <SendOutlinedIcon className="icon" />
              <p className="paragraphTag">
                {Intl.NumberFormat(language, { notation: "compact" }).format(
                  data?.share
                )}
              </p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function DetailsCardCom({ data, loading, path }) {
  const auth = getAuth();
  const db = getFirestore();
  const [uid, setUid] = useState(null);
  const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [name, setName] = useState("");
  console.log("-------data-------", data);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("----userData---", user.uid);
        setUid(user.uid);
        setAlreadyLogin(true);
        const userData = onSnapshot(doc(db, "users", user.uid), (doc) => {
          console.log("Current-- user--dk-- data: ", doc.data());
          setName(doc.data().name);
          setProfileURL(doc.data().profileURL);
        });
      } else {
        setUid(null);
        setAlreadyLogin(false);
      }
    });
  }, []);

  //   likehander
  const likeHandler = async () => {
    if (alreadyLogin) {
      let likes = data?.like;
      let isLiked = likes?.includes(uid);
      if (isLiked) {
        // remove
        for (let index in likes) {
          if (likes[index] === uid) {
            likes.splice(index, 1);
            break;
          }
        }
      } else {
        // add
        likes.push(uid);
      }
      // update data
      const blogRef = doc(db, "dk-blogs", data.blogID);
      await updateDoc(blogRef, {
        like: likes,
      });
    } else {
      setModelOpen(true);
    }
  };

  // shareHandler
  const shareHandler = async () => {
    let share = data?.share;
    share += 1;
    const blogRef = doc(db, "dk-blogs", data?.blogID);
    await updateDoc(blogRef, {
      share: share,
    });
  };
  // copy url
  let copy = (textCopy) => {
    const input = document.getElementById(textCopy);
    input.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 4000); // reset after 2 seconds
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ padding: "15px" }}>
          <Media
            loading={loading}
            data={data}
            uid={uid}
            likeHandler={likeHandler}
          />
          <Grid className="share-Handle-Sec" container>
            <Grid
              container
              className="buttonAndParag"
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              <h2 className="share-text">
                <ShareOutlinedIcon
                  sx={{ height: "40px", width: "40px" }}
                  className="share-icon"
                />
                Share this content
              </h2>
            </Grid>

            <Grid
              container
              className="btn-Grid"
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 3, xs: 12 }}
              ></Grid>
              <Grid
                className="allSocialButtons"
                size={{ xl: 2, lg: 2, md: 4, sm: 6, xs: 12 }}
              >
                <FacebookShareButton
                  onClick={shareHandler}
                  url={`https://dk-news-blog.vercel.app/blog-details/${path}`}
                >
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  onClick={shareHandler}
                  url={`https://dk-news-blog.vercel.app/blog-details/${path}`}
                >
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton
                  onClick={shareHandler}
                  url={`https://dk-news-blog.vercel.app/blog-details/${path}`}
                >
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
              </Grid>
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 3, xs: 12 }}
              ></Grid>
            </Grid>
            <Grid
              container
              className="copyURL"
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              <Grid
                className="TextField"
                size={{ xl: 10, lg: 10, md: 9, sm: 8, xs: 12 }}
              >
                <TextField
                  id="textCopy"
                  label="Copy URL"
                  variant="outlined"
                  className="textURL"
                  value={`https://dk-news-blog.vercel.app/blog-details/${path}`}
                />
              </Grid>
              <Grid
                className="textURLBtn"
                size={{ xl: 2, lg: 2, md: 3, sm: 4, xs: 12 }}
              >
                <Button variant="contained" onClick={() => copy("textCopy")}>
                  {copied ? "Copied" : "Copy"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* comment section starts */}
          <Grid className="share-Handle-Sec" container>
            <Grid container size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 4, xs: 12 }}
              >
                {/* <Button>Share</Button> */}
              </Grid>
              <Grid
                className="buttonAndParag"
                size={{ xl: 2, lg: 2, md: 4, sm: 4, xs: 12 }}
              >
                <h2>{data?.comment?.length} Comments</h2>
              </Grid>
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 4, xs: 12 }}
              ></Grid>
            </Grid>

            <Grid container size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
              <Grid
                className="Avatar"
                size={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 12 }}
              >
                {alreadyLogin && (
                  <Avatar
                    className="avatarSelf"
                    alt={name}
                    src={profileURL}
                    style={{ width: 80, height: 80 }}
                  />
                )}
              </Grid>
              <Grid
                className="TextField"
                size={{ xl: 8, lg: 8, md: 6, sm: 6, xs: 12 }}
              >
                <TextField
                  id="outlined-textarea"
                  label="Add a comment ..."
                  placeholder="Add a comment ..."
                  multiline
                  style={{ width: "100%" }}
                  rows={7}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </Grid>
              <Grid
                className="textURLBtn"
                size={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 12 }}
              >
                <Button variant="contained" disabled={!commentText.trim()}>
                  Comment
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <BasicModal
            open={modelOpen}
            handleClose={() => setModelOpen(false)}
          />
        </Grid>
      </Box>
    </div>
  );
}
