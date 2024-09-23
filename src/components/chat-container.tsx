import React, { useCallback, useEffect, useState } from 'react'
import { MessageData } from '@/lib/message'
import { State } from '@/lib/states'

const openingMessages: string[] = [
  '君がここに来たのはさぁ',
  '猫にしか話せないことが',
  'あるからニャんじゃニャいのかい？',
  '話してごらんよぉ',
]

export interface ChatContainerProps {
  messages: MessageData[]
  onMessageSubmit: (userMsg: string) => Promise<void>
  onMessageDelete: (messageId: string) => Promise<void>

  deleteAllMessages: () => Promise<void>

  state: State
  setState: (state: State) => Promise<void>
}

/**
 * Chat container.
 *
 * The `messages` are taking up central space.
 * Using markdown for rendering.
 *
 * On the botton there are up to 4 buttons showing suggested topics.
 * Buttons captions are sourced from a last `suggestedResponses` value.
 *
 * Then there is a text field with a send submit button for user input.
 *
 * After updating the messages list, the screen will auto-scroll to the bottom.
 *
 * Each few lines of code have a comment explaining what they do.
 *
 * Using Tailwind for all styling.
 *
 * @param props.onMessageSubmit Called upon submitting a message prompt.
 * @param props.messages
 */
const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onMessageSubmit,
  onMessageDelete,
  deleteAllMessages,
  state,
  setState,
}) => {
  'use client'

  const [userMessage, setUserMessage] = React.useState('')

  const inputRef = useCallback((inputElement: HTMLElement | null) => {
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  const prevMessagesCountRef = React.useRef(messages.length)

  const endOfChatRef = React.useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  React.useEffect(() => {
    // Do not auto-scroll if removing a message.
    if (prevMessagesCountRef.current <= messages.length) {
      scrollToBottom()
    }
    prevMessagesCountRef.current = messages.length
  }, [messages])

  const handleUserMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userMessage.trim() === '') {
      return
    }
    onMessageSubmit(userMessage)
    setUserMessage('')
  }

  const [openingMessageIndex, setOpeningMessageIndex] = useState(0)

  useEffect(() => {
    if (state === 'bg_003' || state === 'bg_005' || state === 'bg_007' || state === 'bg_009') {
      if (openingMessageIndex < openingMessages.length) {
        const timer = setTimeout(() => {
          setOpeningMessageIndex((prev) => prev + 1)
        }, 618)

        return () => clearTimeout(timer)
      }
    } else if (openingMessageIndex !== 0) {
      setOpeningMessageIndex(0)
    }
  }, [openingMessageIndex, state])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex-1 py-4">
        <div className="screen-bg" style={{ backgroundImage: `url('${state}.webp')` }}>
          {state === 'bg_start' && (
            <div className="screen-inside">
              <div className="screen-content ">
                <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    type="button"
                    onClick={() => {
                      setState('bg_001')
                    }}
                  >
                    START
                  </button>
                </div>
              </div>
            </div>
          )}

          {state === 'bg_001' && (
            <div className="screen-inside">
              <div className="screen-content ">
                <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    type="button"
                    onClick={() => {
                      // 会話をクリアする
                      deleteAllMessages()

                      setState('bg_002')
                    }}
                  >
                    座る
                  </button>
                </div>
              </div>
            </div>
          )}

          {state === 'bg_010' && (
            <div className="screen-inside">
              <div className="screen-content ">
                <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    type="button"
                    onClick={() => {
                      setState('bg_end')
                    }}
                  >
                    ふぅ...
                  </button>
                </div>
              </div>
            </div>
          )}

          {state === 'bg_end' && (
            <div className="screen-inside">
              <div className="screen-content ">
                <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    type="button"
                    onClick={() => {
                      setState('bg_start')
                    }}
                  >
                    GOOD LUCK!
                  </button>
                </div>
              </div>
            </div>
          )}

          {(state === 'bg_002' || state === 'bg_004' || state === 'bg_006' || state === 'bg_008') && (
            <div className="screen-inside">
              <div className="screen-content ">
                <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
                  <button
                    className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    type="button"
                    onClick={() => {
                      // 注: あとで直す
                      switch (state) {
                        case 'bg_002':
                          setState('bg_003')
                          break
                        case 'bg_004':
                          setState('bg_005')
                          break
                        case 'bg_006':
                          setState('bg_007')
                          break
                        case 'bg_008':
                          setState('bg_009')
                          break
                      }
                    }}
                  >
                    ふぅ...
                  </button>
                </div>
              </div>
            </div>
          )}

          {(state === 'bg_003' || state === 'bg_005' || state === 'bg_007' || state === 'bg_009') && (
            <div className="screen-inside">
              <div className="flex flex-col justify-end screen-content">
                {Array.from({ length: openingMessageIndex }, (_, i) => {
                  return (
                    <div key={i} className="flex items-end">
                      <div className="ml-72 mr-80 mt-4 fukidashi-cat">
                        <div className="flex fukidashi-text-cat">
                          <div className="text-left font-natume">{openingMessages[i]}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {messages.map((message, i) => {
                  const { prompt, response, createTime, status, isEndOfConversation } = message

                  return (
                    <div key={openingMessages.length + i} className="flex items-end">
                      <div className="flex w-full flex-col pb-2">
                        <div className="ml-80 mr-72 mt-2 fukidashi-hito">
                          <div className="flex fukidashi-text-hito">
                            <div className="flex-1 text-left font-natume">{prompt}</div>
                            {message.id && (
                              <button
                                type="button"
                                className="ml-2 text-xl font-bold text-red-600 opacity-60 group-hover:opacity-100"
                                aria-label="Delete message"
                                title="Delete message"
                                onClick={() => onMessageDelete(message.id || '')}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        </div>
                        {createTime && (
                          <div className="mb-5 ml-4 text-center text-3sm text-gray-300/50">
                            {createTime.toDate().toLocaleString()}
                          </div>
                        )}

                        {!status?.state && <div className="ml-4 text-3sm text-gray-900/75">Sending...</div>}

                        {status?.state === 'PROCESSING' && (
                          <div className="ml-72 mr-80 inline-block rounded-lg rounded-br-none bg-gradient-to-r px-4 py-2 text-3sm text-gray-900/75">
                            Thinking...
                          </div>
                        )}

                        {status?.error && (
                          <div className="ml-72 mr-80 inline-block rounded-lg rounded-br-none px-4 py-2 text-red-800/75">
                            {status.error}
                            {status?.updateTime && (
                              <div className="mr-4 mt-2 text-right text-3sm opacity-40">
                                {status?.updateTime.toDate().toLocaleString()}
                              </div>
                            )}
                          </div>
                        )}

                        {response && (
                          <>
                            <div className="ml-72 mr-80 fukidashi-cat">
                              <div className="flex fukidashi-text-cat">
                                <div className="text-left font-natume">{response}</div>
                              </div>
                            </div>
                            {status?.updateTime && (
                              <div className="mb-5 ml-4 text-center text-3sm text-gray-300/50">
                                {status?.updateTime.toDate().toLocaleString()}
                              </div>
                            )}

                            {isEndOfConversation && (
                              <button
                                className="mx-auto rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                                type="button"
                                onClick={() => {
                                  // 会話をクリアする
                                  deleteAllMessages()

                                  // 注: あとで直す
                                  switch (state) {
                                    case 'bg_003':
                                      setState('bg_004')
                                      break
                                    case 'bg_005':
                                      setState('bg_006')
                                      break
                                    case 'bg_007':
                                      setState('bg_008')
                                      break
                                    case 'bg_009':
                                      setState('bg_010')
                                      break
                                  }
                                }}
                              >
                                おやすみ
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
                <div key={openingMessages.length + messages.length} className="mb-40"></div>
              </div>

              <div className="flex justify-between border-t border-gray-200 py-4">
                <button
                  className="ml-4 w-24 rounded-xl bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                  type="button"
                  onClick={() => {
                    setState('bg_start')
                  }}
                >
                  TITLE
                </button>

                {openingMessages.length <= openingMessageIndex &&
                  (state === 'bg_003' || state === 'bg_005' || state === 'bg_007' || state === 'bg_009') && (
                    <form onSubmit={handleUserMessageSubmit} className="flex-1">
                      <div className="ml-52 mr-44 mt-2 flex items-center">
                        <input
                          name="user-message"
                          className="flex-1 rounded-md rounded-r-none px-4 py-2 text-gray-700 placeholder:text-gray-300"
                          placeholder="ねこに悩みを相談する"
                          value={userMessage}
                          ref={inputRef}
                          onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="rounded-md rounded-l-none bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                          話す
                        </button>
                        <div ref={endOfChatRef}></div>
                      </div>
                    </form>
                  )}

                <span className="mr-4 w-24" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
