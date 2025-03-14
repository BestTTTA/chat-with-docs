// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import CourseSelector from './components/CourseSelector';
import ChatMessage from './components/ChatMessage';
import LoadingDots from './components/LoadingDots';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch available courses on component mount
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://119.59.103.209:8000/courses');
        const data = await response.json();
        setCourses(data.courses);
        if (data.courses.length > 0) {
          setSelectedCourse(data.courses[0]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('http://119.59.103.209:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_name: selectedCourse,
          query: inputValue,
          use_gpt4o: true,
          top_k: 3,
        }),
      });

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: data.analysis || 'ไม่พบข้อมูลที่เกี่ยวข้อง',
        sender: 'bot',
        timestamp: new Date(),
        results: data.results,
        analysis: data.analysis,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setMessages([]);
  };

  return (
    <main className="flex bg-gray-900 min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">ระบบค้นหาข้อมูลหลักสูตร</h1>
          <p className="text-blue-100">ถามคำถามเกี่ยวกับหลักสูตรได้เลย</p>
        </div>
        
        <div className="p-4">
          <CourseSelector
            courses={courses}
            selectedCourse={selectedCourse}
            onCourseChange={handleCourseChange}
          />
        </div>
        
        <div className="bg-gray-50 p-4 h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 pt-20">
              <p>ยินดีต้อนรับสู่ระบบค้นหาข้อมูลหลักสูตร</p>
              <p className="text-sm mt-2">คุณสามารถถามคำถามเกี่ยวกับหลักสูตรได้เลย เช่น:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>- แสดงโครงสร้างหลักสูตร</li>
                <li>- มีวิชาอะไรบ้างที่ต้องเรียน</li>
                <li>- แผนการศึกษาเป็นอย่างไร</li>
                <li>- วิชาบังคับมีอะไรบ้าง</li>
              </ul>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && (
                <div className="flex justify-start my-2">
                  <div className="bg-gray-200 rounded-lg p-3 max-w-[80%]">
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="พิมพ์คำถามของคุณที่นี่..."
              className="flex-1 text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading || !inputValue.trim()}
            >
              ส่ง
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}