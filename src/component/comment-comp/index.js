import { useState, useEffect } from "react";
import "./index.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
// const imgLink =
//   "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
const CommentComponent = ({ data }) => {
  const [comments, setComments] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      let commentsData = [];
      for (let index in data) {
        const userRef = doc(db, "users", data[index].uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          commentsData.push({
            ...data[index],
            ...userSnap.data(),
          });
        }
      }
      setComments(commentsData);
    };
    fetchData();
  }, [data, db]);

  let sortComments = comments?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  console.log("sort Comments", sortComments);
  return (
    <div style={{ width: "100%" }}>
      {/* <h2 className="headingTwo"> Comments</h2> */}
      {sortComments?.map((item, index) => {
        console.log("item", item);
        return (
          // <div  width="100%">
          <Paper key={index} className="paper">
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
                  alt={item?.name}
                  src={item?.profileURL}
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
                  {item?.name}
                </h4>
                <p className="commentText" style={{ textAlign: "justify" }}>
                  {item?.commentText}
                </p>
                <p className="dateParagraph">
                  {" "}
                  {moment(item?.createdAt).fromNow()}
                </p>
              </Grid>
            </Grid>
          </Paper>
          // </div>
        );
      })}
    </div>
  );
};
export default CommentComponent;
