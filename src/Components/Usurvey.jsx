// import { v1 as uuidv1 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import {
  database,
  doc,
  setDoc,
  ref,
  set,
  collection,
  getDocs,
  get,
  child,
  updateProfile,
  update,
} from "./firebaseConfig";
import Answers from "./Answers";
import Loader from "./Loader/Loader";

function Usurvey({ user }) {
  const uid = user.uid;
  // const [uid, setUid] = useState(uuidv1());
  const [studentName, setStudentName] = useState(user.displayName);
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [db_arr, setDb_arr] = useState([]);
  const [dbActive, setDbActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const nameRef = useRef(null);

  const nameSubmit = (event) => {
    event.preventDefault();
    setStudentName(nameRef.current.value);
    updateProfile(user, {
      displayName: nameRef.current.value,
    }).then(() => {
      update(ref(database, "users/" + uid), {
        name: user.displayName,
      });
    });
  };

  const answerSelected = (event) => {
    if (event.target.name === "answer1") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        answer1: event.target.value,
      }));
    } else if (event.target.name === "answer2") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        answer2: event.target.value,
      }));
    } else if (event.target.name === "answer3") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        answer3: event.target.value,
      }));
    } else if (event.target.name === "answer4") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        answer4: event.target.value,
      }));
    } else if (event.target.name === "answer5") {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        answer5: event.target.value,
      }));
    }
  };

  //---- Realtime Database - Firebase

  const questionSubmit = (event) => {
    event.preventDefault();
    if (
      answers.answer1 &&
      answers.answer2 &&
      answers.answer3 &&
      answers.answer4
    ) {
      console.log("Submitting data...");
      console.log("Student Name:", studentName);
      console.log("Answers:", answers);

      set(ref(database, "uSurvey/" + uid), {
        studentName: studentName,
        answers: answers,
      })
        .then(() => {
          console.log("Data submitted successfully");
          setIsSubmitted(true);
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });
    } else {
      alert("Complete the survey and then submit...");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, "uSurvey/"));
        if (snapshot.exists()) {
          console.log(snapshot.forEach);

          const newItems = [];
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.key === uid) {
              const newItem = {
                id: childSnapshot.key,
                name: childSnapshot.val().studentName,
                answers: childSnapshot.val().answers,
              };
              setAnswers(childSnapshot.val().answers);
              newItems.push(newItem);
              setIsLoading(false);
            }
          });
          setDb_arr(newItems);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [isSubmitted]);

  //---- Firestore Database

  // const questionSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submitting data...");
  //   console.log("Student Name:", studentName);
  //   console.log("Answers:", answers);

  //   try {
  //     await setDoc(doc(database, "uSurvey", uid), {
  //       studentName: studentName,
  //       answers: answers,
  //     });
  //     console.log("Data submitted successfully");
  //     setIsSubmitted(true);
  //   } catch (error) {
  //     console.error("Error submitting data: ", error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(database, "uSurvey"));
  //       querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => `, doc.data());
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  let student_name;
  let questions;

  if (!studentName && !isSubmitted) {
    student_name = (
      <div className="form-container">
        <h1>Hey Student, please let us know your name:</h1>
        <br />
        <form onSubmit={nameSubmit}>
          <input
            className="namy"
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
          />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
    questions = "";
  } else if (studentName && !isSubmitted) {
    student_name = <h1>Welcome to U-survey, {studentName}</h1>;
    questions = (
      <div>
        <h2>Here are some questions : </h2>
        <form onSubmit={questionSubmit}>
          <div className="card">
            <label>What kind of courses do you like the most: </label>
            <br />
            <input
              type="radio"
              name="answer1"
              value={"Technology"}
              onChange={answerSelected}
              checked={answers.answer1 === "Technology"}
            />
            Technology
            <input
              type="radio"
              name="answer1"
              value={"Design"}
              onChange={answerSelected}
              checked={answers.answer1 === "Design"}
            />
            Design
            <input
              type="radio"
              name="answer1"
              value={"Marketing"}
              onChange={answerSelected}
              checked={answers.answer1 === "Marketing"}
            />
            Marketing
          </div>
          <div className="card">
            <label>You are a: </label>
            <br />
            <input
              type="radio"
              name="answer2"
              value={"student"}
              onChange={answerSelected}
              checked={answers.answer2 === "student"}
            />
            Student
            <input
              type="radio"
              name="answer2"
              value={"in-job"}
              onChange={answerSelected}
              checked={answers.answer2 === "in-job"}
            />
            In a job
            <input
              type="radio"
              name="answer2"
              value={"looking-job"}
              onChange={answerSelected}
              checked={answers.answer2 === "looking-job"}
            />
            Looking for a job
          </div>
          <div className="card">
            <label>Is online learning helpful: </label>
            <br />
            <input
              type="radio"
              name="answer3"
              value={"yes"}
              onChange={answerSelected}
              checked={answers.answer3 === "yes"}
            />
            Yes
            <input
              type="radio"
              name="answer3"
              value={"no"}
              onChange={answerSelected}
              checked={answers.answer3 === "no"}
            />
            No
            <input
              type="radio"
              name="answer3"
              value={"maybe"}
              onChange={answerSelected}
              checked={answers.answer3 === "maybe"}
            />
            Maybe
          </div>
          <div className="card">
            <label>Rate this course: </label>
            <br />
            <input
              type="radio"
              name="answer4"
              value={"v-bad"}
              onChange={answerSelected}
              checked={answers.answer4 === "v-bad"}
            />
            Very Bad
            <input
              type="radio"
              name="answer4"
              value={"bad"}
              onChange={answerSelected}
              checked={answers.answer4 === "bad"}
            />
            Bad
            <input
              type="radio"
              name="answer4"
              value={"avg"}
              onChange={answerSelected}
              checked={answers.answer4 === "avg"}
            />
            Average
            <input
              type="radio"
              name="answer4"
              value={"good"}
              onChange={answerSelected}
              checked={answers.answer4 === "good"}
            />
            Good
            <input
              type="radio"
              name="answer4"
              value={"v-good"}
              onChange={answerSelected}
              checked={answers.answer4 === "v-good"}
            />
            Very Good
          </div>
          <div className="card">
            <label>Write a review: </label>
            <br />
            <textarea
              name="answer5"
              onChange={answerSelected}
              placeholder={answers.answer5 || "Write your review here..."}
              rows="3"
              cols="50"
            />
          </div>
          <input className="feedback-button" type="submit" value={"submit"} />
        </form>
      </div>
    );
  } else if (studentName && isSubmitted) {
    student_name = <h1>Thanks, {studentName}.</h1>;

    const temp_xml = db_arr.map((item, i) => (
      <Answers
        key={i}
        id={item.id}
        name={item.name}
        answers={item.answers}
        active={dbActive}
      />
    ));

    questions = (
      <>
        <button
          onClick={() => setDbActive(true)}
          className={dbActive ? "invisible" : "button"}
        >
          See database data
        </button>
        {temp_xml}
      </>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {student_name}
      <br />
      <hr />
      <br />
      {questions}
    </div>
  );
}

export default Usurvey;
