"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ChevronLeft, PlayCircle, CheckCircle, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';

// --- DATABASE CONNECTION ---
const supabaseUrl = '   https://ypqelxyyljaxmdbfpitv.supabase.co';
const supabaseAnonKey = '   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtYnBjaG5idmZncGJqdWxoYXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDczMzEsImV4cCI6MjA5NTkyMzMzMX0.uQUEh7z7jFr70uf4H7jqgUQz9fkXLX8liYf2C3fyG44';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LessonPlayer() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // Example Lesson Data (You can change these later)
  const lessons = [
    { id: 1, title: "Welcome to Vigileon", duration: "05:20", videoId: "dQw4w9WgXcQ" },
    { id: 2, title: "Setting up your Environment", duration: "12:45", videoId: "dQw4w9WgXcQ" },
    { id: 3, title: "Understanding React Components", duration: "18:10", videoId: "dQw4w9WgXcQ" },
  ];

  const [currentLesson, setCurrentLesson] = useState(lessons[0]);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('is_subscribed')
      .eq('id', user.id)
      .single();

    if (!data?.is_subscribed) {
      alert("Please purchase the course to access lessons.");
      window.location.href = "/pricing";
    } else {
      setProfile(data);
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="text-cyan-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      
      {/* 1. Video Player Area */}
      <div className="w-full aspect-video bg-black sticky top-0 z-10 shadow-2xl">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
          title="Lesson Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* 2. Lesson Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-cyan-500 text-[10px] font-black uppercase tracking-widest mb-2">
          <PlayCircle size={12} /> Now Playing
        </div>
        <h1 className="text-2xl font-black mb-1">{currentLesson.title}</h1>
        <p className="text-slate-500 text-sm mb-6">Module 1: The Foundations</p>

        <div className="flex gap-3 mb-8">
          <button className="flex-1 bg-slate-900 border border-slate-800 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-all">
            <MessageSquare size={16} /> ASK QUESTION
          </button>
          <button className="flex-1 bg-cyan-500 text-slate-950 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold active:scale-95 transition-all">
            MARK COMPLETE <CheckCircle size={16} />
          </button>
        </div>

        {/* 3. Playlist / Next Lessons */}
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Course Content</h3>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson)}
              className={`p-4 rounded-2xl flex items-center justify-between transition-all active:scale-95 ${
                currentLesson.id === lesson.id ? 'bg-cyan-500/10 border border-cyan-500/50' : 'bg-slate-900 border border-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                  currentLesson.id === lesson.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {lesson.id}
                </div>
                <div>
                  <p className={`text-sm font-bold ${currentLesson.id === lesson.id ? 'text-cyan-500' : 'text-white'}`}>
                    {lesson.title}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">{lesson.duration}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => window.location.href = "/dashboard"}
        className="fixed bottom-6 left-6 bg-slate-800/80 backdrop-blur-md p-4 rounded-full shadow-xl border border-slate-700"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}
