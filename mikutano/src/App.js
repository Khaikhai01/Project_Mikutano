import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react=firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDBWlPvc8TSFsftAwSzSef7X7aLA-xfZRk",
  authDomain: "mikutano-d2421.firebaseapp.com",
  projectId: "mikutano-d2421",
  storageBucket: "mikutano-d2421.appspot.com",
  messagingSenderId: "602911919949",
  appId: "1:602911919949:web:f0b481028d6eedaa037104",
  measurementId: "G-CY3YN6WSCN"
})

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        
      </header>
      <section>
        {user ? <Chatroom /> : <SignIn /> }
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentuser && (

   <button onClick={() => auth.signOut()}>Sign Out</button> 
  )
}

function ChatRoom() {

  const messageRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div> 
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <form>
        <button type="submit"></button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
  <div className={''}>
    <img src={photoURL} />

    <p>{text}</p> 
  </div>
  )
}

export default App;
