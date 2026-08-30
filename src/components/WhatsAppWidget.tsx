import { useState, useEffect } from "react";

// CHANGE THIS TO YOUR REAL NUMBER
const WHATSAPP_NUMBER = "254797639557";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3500); // show after 3.5 seconds like in your video

    return () => clearTimeout(timer);
  }, []);

  const defaultMessage = `Jambo! Welcome to Juma Adventures 🦁%0A%0AI'm interested in a safari. Can you help me plan my trip?`;

  const chatLink = `${WHATSAPP_LINK}?text=${defaultMessage}`;

  return (
    <>
      {/* WELCOME BUBBLE */}
      {showBubble && (
        <div className="fixed bottom-[90px] right-4 md:right-6 z-[9999] w-[300px] bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.2)] border border-black/5 overflow-hidden animate-[slideUp_0.4s_ease]">
          {/* Header */}
          <div className="bg-[#075E54] p-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[18px]">🦁</div>
              <div>
                <p className="font-bold text-[13px] leading-none">Juma Adventures</p>
                <p className="text-[11px] opacity-80 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#25D366] rounded-full inline-block"></span>
                  Online • Replies in 2 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowBubble(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          {/* Message */}
          <div className="p-4 bg-[#E5DDD5] relative">
            {/* Chat background pattern */}
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeT...")`}}></div>

            <div className="relative bg-white rounded-[12px] rounded-tl-none p-3 shadow-sm max-w-[85%]">
              <p className="text-[13px] leading-[18px] text-[#111]">
                <span className="font-bold">Jambo! Karibu! 👋</span><br/>
                Welcome to Juma Adventures!<br/><br/>
                Ready for your dream safari in Masai Mara? I can help you plan now.
              </p>
              <p className="text-[10px] text-black/40 text-right mt-1">10:42 AM ✓✓</p>
            </div>
          </div>

          {/* Button */}
          <div className="p-3 bg-white">
            <a
              href={chatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[14px] py-3 rounded-full flex items-center justify-center gap-2 transition-all"
            >
              {/* Official WhatsApp Logo */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M19.05 4.91A9.815 9.815 0 0 0 12.03 2C6.51 2 2.03 6.48 2.03 12a9.896 9.896 0 0 0 1.32 4.96L2 22l5.2-1.36a9.9 9.9 0 0 0 4.83 1.23h.01c5.52 0 10-4.48 10-10a9.87 9.87 0 0 0-2.99-7.16zM12.03 20.14h-.01a8.057 8.057 0 0 1-4.12-1.13l-.3-.18-3.09.81.83-3.01-.2-.31A8.15 8.15 0 0 1 4 12c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.74 2.39a8.06 8.06 0 0 1 2.39 5.74c0 4.48-3.65 8.14-8.24 8.14zm4.46-6.1c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94-.28.18-.52.06-.97-.36-1.81-1.14c-.67-.6-1.12-1.33-1.25-1.56s-.01-.35.1-.47c.1-.1.24-.26.36-.38.12-.13.16-.22.24-.36.08-.15.04-.27-.02-.39s-.54-1.31-.74-1.79c-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.27s-.84.82-.84 2.87.22.36.66.54.98.18 2.08-.13 1.84-.53 3.09-.53 2.11.53 2.43.79.52.39.6.61.02.36-.02.48-.08.13-.2.25z"/>
              </svg>
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON - OFFICIAL LOGO */}
      <a
        href={chatLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9999] w-[62px] h-[62px] bg-[#25D366] rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] transition-all group"
      >
        <svg viewBox="0 0 24 24" width="34" height="34" fill="white" className="group-hover:scale-110 transition-transform">
          <path d="M19.05 4.91A9.815 9.815 0 0 0 12.03 2C6.51 2 2.03 6.48 2.03 12a9.896 9.896 0 0 0 1.32 4.96L2 22l5.2-1.36a9.9 9.9 0 0 0 4.83 1.23h.01c5.52 0 10-4.48 10-10a9.87 9.87 0 0 0-2.99-7.16zM12.03 20.14h-.01a8.057 8.057 0 0 1-4.12-1.13l-.3-.18-3.09.81.83-3.01-.2-.31A8.15 8.15 0 0 1 4 12c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.74 2.39a8.06 8.06 0 0 1 2.39 5.74c0 4.48-3.65 8.14-8.24 8.14zm4.46-6.1c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94-.28.18-.52.06-.97-.36-1.81-1.14c-.67-.6-1.12-1.33-1.25-1.56s-.01-.35.1-.47c.1-.1.24-.26.36-.38.12-.13.16-.22.24-.36.08-.15.04-.27-.02-.39s-.54-1.31-.74-1.79c-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.27s-.84.82-.84 2.87.22.36.66.54.98.18 2.08-.13 1.84-.53 3.09-.53 2.11.53 2.43.79.52.39.6.61.02.36-.02.48-.08.13-.2.25z"/>
        </svg>
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
      </a>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
