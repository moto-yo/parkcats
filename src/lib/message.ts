import { Timestamp } from 'firebase/firestore'

// Firestore: users/{uid}/messages/{message id}
export interface FirestoreMessageData {
  prompt: string
  response?: string

  // ドキュメントの生成時間
  createTime?: Timestamp

  status?: {
    state: 'COMPLETED' | 'PROCESSING' | 'ERROR'
    // 生成の開始時間
    startTime: Timestamp
    // 生成の完了時間
    completeTime?: Timestamp
    // 最後に statusが変更された時間
    updateTime: Timestamp
    error?: string
  }
}

// page.tsxに useState<MessageData[]>()で保持される
export interface MessageData extends FirestoreMessageData {
  id?: string
  injectedContext?: string

  isEndOfConversation?: boolean
}

// Firestore上の messageが更新された
export const prepareMessage = (firestoreMessageData: FirestoreMessageData, id: string): MessageData => {
  const messageData: MessageData = {
    ...firestoreMessageData,
    id: id,
  }

  const [injectedContext, userPrompt] = firestoreMessageData.prompt.split('\n---\n', 2)

  // console.log('injectedContext', injectedContext)
  // console.log('userPrompt', userPrompt)

  if (userPrompt) {
    messageData.prompt = userPrompt
    messageData.injectedContext = injectedContext
  }

  const response = firestoreMessageData.response

  if (response) {
    const index = response.lastIndexOf('##END_OF_CONVERSATION')

    if (0 <= index) {
      messageData.response = response.substring(0, index).trimEnd()
      messageData.isEndOfConversation = true
    }
  }

  return messageData
}
