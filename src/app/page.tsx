'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import {
  getFirestore,
  collection,
  CollectionReference,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import ChatContainer from '@/components/chat-container'
import { FirebaseUserContext } from '@/lib/firebase-user'
import { preparePrompt } from '@/lib/prepare-prompt'
import { FirestoreMessageData, MessageData, prepareMessage } from '@/lib/message'
import { State, STATES } from '@/lib/states'
import { FirestoreUserData } from '@/lib/user-data'

/**
 * A portal page with an ai chat.
 *
 * Using <ChatContainer>` component.
 *
 * Using `messages` (state variable) subscribed to Firestore collection `messages`
 * with `use` hook.
 */
const ChatPage = () => {
  const user = useContext(FirebaseUserContext)
  const uid = user.currentUser?.uid
  const db = getFirestore()

  const [messages, setMessages] = useState<MessageData[]>([])
  const [userData, setUserData] = useState<FirestoreUserData>()

  // ------------
  // messages
  // ------------

  const messagesCollection = useMemo(
    () => collection(db, `users/${uid}/messages`) as CollectionReference<FirestoreMessageData>,
    [db, uid]
  )

  useEffect(() => {
    // Geminiの responseが書き込まれた
    const unsubscribe = onSnapshot(query(messagesCollection, orderBy('createTime', 'asc')), {}, (snapshot) => {
      const messages = snapshot.docs.map((doc) => prepareMessage(doc.data(), doc.id))

      console.log(
        'Message doc changes: ',
        snapshot.docChanges().map((ch) => ({ type: ch.type, id: ch.doc.id, doc: ch.doc.data() }))
      )

      setMessages(messages)
    })

    return unsubscribe
  }, [messagesCollection, uid])

  // user promptを書き込む
  const sendMessage = async (userMsg: string) => {
    const state = userData?.state

    if (state) {
      // user promptをすぐに表示する
      setMessages((prev) => [...prev, { prompt: userMsg }])

      // Geminiへ messageを送信する
      const newMessageRef = await addDoc(messagesCollection, {
        // 'prompt'へ書き込む
        prompt: preparePrompt(state, userMsg, messages), // 事前プロンプトを埋め込む
      })

      console.log('New message added with ID: ', newMessageRef.id)
    }
  }

  // messageを削除する
  const deleteMessage = async (messageId: string) => {
    await deleteDoc(doc(messagesCollection, messageId))
  }

  const deleteAllMessages = async () => {
    for (const message of messages) {
      const messageId = message.id

      if (messageId) {
        await deleteMessage(messageId)
      }
    }
  }

  // ------------
  // user data
  // ------------

  // read
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, `users/${uid}`)
      const docSnap = await getDoc(docRef)

      setUserData(
        docSnap.exists()
          ? (docSnap.data() as FirestoreUserData)
          : {
              state: STATES[0],
            }
      )
    }

    fetchData()
  }, [db, uid])

  const setState = async (state: State) => {
    const userData0 = { ...userData, state: state }

    setUserData(userData0)

    // write
    const docRef = doc(db, `users/${uid}`)

    await setDoc(docRef, userData0)

    /* update
    await updateDoc(docRef, {
      state: state,
    } as Partial<FirestoreUserData>)
    */
  }

  if (!userData) {
    return <span />
  }

  return (
    <ChatContainer
      messages={messages}
      onMessageSubmit={sendMessage}
      onMessageDelete={deleteMessage}
      deleteAllMessages={deleteAllMessages}
      state={userData.state}
      setState={setState}
    />
  )
}

export default ChatPage
