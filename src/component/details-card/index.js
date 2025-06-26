import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import moment from "moment";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./index.css";
import BasicModal from "../basic-model";
const language = "en";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
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
  console.log("-------data-------", data);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("----userData---", user.uid);
        setUid(user.uid);
        setAlreadyLogin(true);
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

  // Clipboard functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
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
              className="mainGrid"
              size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
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
                <ShareOutlinedIcon className="share-icon" />
                <h5 className="share-text">Share this content</h5>
              </Grid>
              <Grid
                className="emptyGrid"
                size={{ xl: 5, lg: 5, md: 4, sm: 4, xs: 12 }}
              >
                {/* <Button>Share</Button> */}
              </Grid>
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
                <FacebookShareButton>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton>
                  <WhatsappIcon size={32} round={true} />
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
              <b style={{ textAlign: "center" }}>Copy URL</b>
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
                  copied ? "bg-green-600 hover:bg-green-700" : ""
                }`}
              >
                {copied ? (
                  <FaClipboardCheck size={24} />
                ) : (
                  <FaRegClipboard size={16} />
                )}
                <span className="ml-2">{copied ? "Copied!" : "Copy URL"}</span>
              </button>
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
