import React from "react";
import "./index.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
const CommentComponent = () => {
  return (
    // <div className="userComments-Sec">
    //   <h2 className="headingTwo"> Comments</h2>

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
          <p style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
            Suspendisse congue vulputate lobortis. Pellentesque at interdum
            tortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittis
            ipsum. Aliquam ultricies a ligula nec faucibus. In elit metus,
            efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque
            et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum,
            mauris mi vehicula urna, nec feugiat quam lectus vitae ex.{" "}
          </p>
          <p className="dateParagraph">posted 1 minute ago</p>
        </Grid>
      </Grid>
    </Paper>
    // </div>
  );
};
export default CommentComponent;
