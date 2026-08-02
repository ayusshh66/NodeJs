import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { MdModeEditOutline, MdOutlineDone } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

function Todo({ user }) {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 });

  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const cursorVariants  = {
    default: {
      width: 36,
      height: 36,
      x: '-50%',
      y: '-50%',
      backgroundColor: 'rgba(236, 72, 153, 0.15)',
      border: '2px solid rgba(236, 72, 153, 0.6)',
      mixBlendMode: 'normal',
    },
    hover: {
      width: 56,
      height: 56,
      x: '-50%',
      y: '-50%',
      backgroundColor: 'rgba(236, 72, 153, 0.25)',
      border: '2px solid rgba(236, 72, 153, 1)',
      mixBlendMode: 'normal',
    },
    click: {
      width: 24,
      height: 24,
      x: '-50%',
      y: '-50%',
      backgroundColor: 'rgba(236, 72, 153, 0.5)',
      border: '2px solid rgba(236, 72, 153, 1)',
    },
    text: {
      width: 4,
      height: 32,
      x: '-50%',
      y: '-50%',
      borderRadius: '2px',
      backgroundColor: 'rgba(236, 72, 153, 0.8)',
      border: 'none',
    },
  }

  const getTodos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/todos/');
      setTodos(res.data);
      console.log(res.data)
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateTodo = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/todos/${id}`, {
        description: editText,
      })
      setEditText('');
      setEditTodo(null);
      getTodos();
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`)
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error.message)
    }
  }

  const toggleComplete = async (id) => {
    try {
      const update = todos.find((todo) => todo.id === id)
      await axios.patch(`http://localhost:8000/todos/${id}`, {
        description: update.description,
        completed: !update.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      getTodos();
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/todos/', {
        description,
        completed: false,
      });
      setDescription('');
      getTodos()
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
          <style>{`* { cursor: none !important; }`}</style>

          <motion.div
        style={{
          position: 'fixed',
          top: springY,
          left: springX,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        }}
        variants={cursorVariants}
        animate={cursorVariant}
      />

      <motion.div
        style={{
          position: 'fixed',
          top: dotY,
          left: dotX,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#ec4899',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />


      <div className='body w-full h-full bg-gradient-to-b from-white via-pink-200 to-pink-100 selection:bg-pink-200'>
        <div className='flex justify-center items-center h-screen w-xl mx-auto'>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='container bg-pink-300 h-180 rounded-2xl shadow-2xl flex flex-col items-center gap-6 p-4 overflow-y-auto'
          >

           
            <motion.div
              className='font-semibold text-xl text-pink-600'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className='text-pink-50 border-b-2'>{user}</span> What is in you mind?
            </motion.div>

          
            <motion.form
              onSubmit={onSubmitHandle}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              <div>
                <input
                  placeholder='Todo'
                  className='h-10 w-sm bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500 focus:ring-2 focus:ring-pink-500 duration-200'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  
                  animate={{ boxShadow: ['0 0 0px #ec4899', '0 0 12px #ec4899', '0 0 0px #ec4899'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className='bg-pink-600 px-4 py-2 rounded-lg felex justify-center items-center text-pink-50 shadow-2xl shadow-pink-500 cursor-pointer -ml-13 duration-200'
                >
                  Set
                </motion.button>
              </div>
            </motion.form>

            <div className='text-black'>
              {todos.length === 0 ? (
                
                <motion.div
                  className='font-semibold text-2xl mt-50 text-pink-50'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  No Todo created!
                </motion.div>
              ) : (
                <>
                  <div className='flex flex-col gap-6 -ml-2'>
                  
                    <AnimatePresence>
                      {todos.map((todo, index) => {
                        return (
                          <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            // Exit slide right + fade
                            exit={{ opacity: 0, x: 60, scale: 0.85, transition: { duration: 0.25 } }}
                            // Stagger each item by index
                            transition={{ duration: 0.25, delay: index * 0.05 }}
                            className='flex flex-col gap-8'
                          >

                           
                            <AnimatePresence mode='wait'>
                              {editTodo === todo.id ? (
                                <motion.div
                                  key='edit'
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className='flex'
                                >
                                  <div>
                                    <input
                                      type='text'
                                      className='h-10 w-80 bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500 focus:ring-2 focus:ring-pink-500 duration-200'
                                      value={editText}
                                      onChange={(e) => setEditText(e.target.value)}
                                    />
                                  </div>

                                  <div className='flex ml-3 gap-4'>
                                    <motion.button
                                      whileHover={{ scale: 1.25 }}
                                      whileTap={{ scale: 0.9 }}
                                      className='cursor-pointer duration-200'
                                      onClick={() => updateTodo(todo.id)}
                                    >
                                      <MdOutlineDone />
                                    </motion.button>

                                    <motion.button
                                      whileHover={{ scale: 1.25 }}
                                      whileTap={{ scale: 0.9 }}
                                      className='cursor-pointer duration-200'
                                      onClick={() => setEditTodo(null)}
                                    >
                                      <IoClose />
                                    </motion.button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key='view'
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className='flex gap-4'>

                                    <motion.button
                                      whileHover={{ scale: 1.15 }}
                                      whileTap={{ scale: 0.9 }}
                                      
                                      animate={todo.completed ? { scale: [1, 1.3, 1] } : {}}
                                      transition={{ type: 'spring', stiffness: 300 }}
                                      onClick={() => toggleComplete(todo.id)}
                                      className={`h-6 w-6 flex justify-center items-center rounded-full cursor-pointer border-2 border-white duration-200 shrink-0
                                        ${todo.completed
                                          ? "bg-green-500 border-green-500"
                                          : "border-gray-300 hover:border-blue-500 bg-pink-50"
                                        }`}
                                    >
                                      {todo.completed && <MdOutlineDone size={16} />}
                                    </motion.button>

                                    
                                    <motion.span
                                      className='flex-1'
                                      animate={{
                                        opacity: todo.completed ? 0.5 : 1,
                                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                                      }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {todo.description}
                                    </motion.span>

                                    <div className='flex gap-4'>

                                      
                                      <motion.div
                                        whileHover={{ scale: 1.25, rotate: 10 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <MdModeEditOutline
                                          className='cursor-pointer duration-200'
                                          onClick={() => {
                                            setEditTodo(todo.id)
                                            return setEditText(todo.description)
                                          }}
                                        />
                                      </motion.div>

                                      
                                      <motion.div
                                        whileHover={{ scale: 1.25, rotate: -10 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <FaTrash
                                          onClick={() => deleteTodo(todo.id)}
                                          className='cursor-pointer duration-200'
                                        />
                                      </motion.div>

                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Todo