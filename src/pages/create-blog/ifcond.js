var a = 10;
if (a < 10) {
  console.log("a is less than 10");
} else {
  console.log("a is greater than 10");
}
a < 10 ? console.log("a is less than 10") : null

a < 10 && console.log("a is less than 10") 
a < 10 ? console.log("a is less than 10") : a > 10 ? console.log("a is greater than 10") : console.log("a is greater than 10");






  useEffect(() => {
    let isMounted = true;
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
      if (isMounted) {
      setComments(commentsData);
      }
    };
    if (data && data.length > 0) {
      fetchData();
    } else {
      setComments([]);
    }
    return () => {
      isMounted = false;
    };
  }, [data, db]);

  let sortComments = comments
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log("sort Comments", sortComments);
