import React, { useEffect, useState } from "react";
import CommentComponent from "../comment-comp";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CircularProgress from "@mui/material/CircularProgress";
// import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
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
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

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
                  data?.share.length
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
  // const [profileURL, setProfileURL] = useState("");
  // const [name, setName] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  // console.log("-------data-------", data);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("----userData---", user.uid);
        setUid(user.uid);
        setAlreadyLogin(true);
        const userData = onSnapshot(doc(db, "users", user.uid), (doc) => {
          console.log("Current-- user--dk-- data: ", doc.data());
          const user = doc?.data();
          setUserData(user);
          // console.log("---DK--User--->>", user);
          // setName(doc.data().name);
          // setProfileURL(doc.data().profileURL);
        });
      } else {
        setUid(null);
        setAlreadyLogin(false);
      }
    });
  }, []);
  console.log("---userData--->>", userData);
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

  //commentHandler
  const commentHandler = async () => {
    if (alreadyLogin) {
      // const userComment = data?.comment;
      // userComment.push(commentText);
    } else {
      setModelOpen(true);
    }
    // const blogRef = doc(db, "dk-blogs", data?.blogID);
    // await updateDoc(blogRef, {
    //   comment: commentText,
    // });
    // alert("commetText", commentText);
    setCommentText("");
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
                <h2>Add Comment</h2>
              </Grid>
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 4, xs: 12 }}
              ></Grid>
            </Grid>

            <Grid
              className="commentTextSec"
              // style={{ border: "1px solid gray"  }}
              container
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              <Grid
                className="Avatar"
                size={{ xl: 2, lg: 2, md: 3, sm: 12, xs: 12 }}
              >
                <Avatar
                  className="avatarSelf"
                  alt={alreadyLogin ? userData?.name : "Guest"}
                  src={alreadyLogin ? userData?.profileURL : "#"}
                  style={{ width: 60, height: 60 }}
                />
              </Grid>
              <Grid
                className="TextField"
                size={{ xl: 8, lg: 8, md: 6, sm: 12, xs: 12 }}
              >
                <TextField
                  id="outlined-textarea"
                  label="Add a comment ..."
                  placeholder="Add a comment ..."
                  multiline
                  style={{ width: "100%" }}
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </Grid>
              <Grid
                className="textURLBtn"
                size={{ xl: 2, lg: 2, md: 3, sm: 12, xs: 12 }}
              >
                <Button
                  onClick={commentHandler}
                  variant="contained"
                  disabled={commentText === ""}
                >
                  {commentLoading ? (
                    <CircularProgress style={{ color: "white" }} size={20} />
                  ) : (
                    "Comment"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* All uers comments section */}
          {/* <div className="userComments-Sec">
            <h2 className="headingTwo">{data?.comment?.length} Comments</h2>

            <Paper className="paper">
              <Grid
                className="mainGridComp"
                container
                // wrap="nowrap"
                spacing={2}
                size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              >
                <Grid
                  className="avatarGrid"
                  item
                  size={{ xl: 1, lg: 1, md: 1, sm: 12, xs: 12 }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={imgLink}
                    sx={{ width: "60px", height: "60px" }}
                  />
                </Grid>
                <Grid
                  size={{ xl: 11, lg: 11, md: 11, sm: 12, xs: 12 }}
                  className="insideGrid"
                  justifyContent="left"
                  item
                  xs
                  zeroMinWidth
                >
                  <h4
                    className="headingFour"
                    // style={{ margin: 0, textAlign: "left" }}
                  >
                    Michel Michel
                  </h4>
                  <p style={{ textAlign: "left", textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean luctus ut est sed faucibus. Duis bibendum ac ex
                    vehicula laoreet. Suspendisse congue vulputate lobortis.
                    Pellentesque at interdum tortor. Quisque arcu quam,
                    malesuada vel mauris et, posuere sagittis ipsum. Aliquam
                    ultricies a ligula nec faucibus. In elit metus, efficitur
                    lobortis nisi quis, molestie porttitor metus. Pellentesque
                    et neque risus. Aliquam vulputate, mauris vitae tincidunt
                    interdum, mauris mi vehicula urna, nec feugiat quam lectus
                    vitae ex.{" "}
                  </p>
                  <p
                    className="dateParagraph"
                  >
                    posted 1 minute ago
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </div> */}
          <div className="userComments-Sec">
            <h2 className="headingTwo">{data?.comment?.length} Comments</h2>
            {Array.from(new Array(5)).map((item, index) => (
              // here in item receives value form data var we passed
              <CommentComponent />
            ))}
          </div>
          <BasicModal
            open={modelOpen}
            handleClose={() => setModelOpen(false)}
          />
        </Grid>
      </Box>
    </div>
  );
}
