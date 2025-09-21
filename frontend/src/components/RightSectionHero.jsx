import React from "react";
import { Users, TrendingUp, PenTool, Sparkles } from "lucide-react";

const RightSectionHero = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="relative">
        {/* Main SVG Illustration */}
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          className="drop-shadow-2xl"
        >
          {/* Background Circle */}
          <circle
            cx="250"
            cy="250"
            r="220"
            fill="url(#backgroundGradient)"
            opacity="0.1"
          />

          {/* Laptop Base */}
          <rect
            x="120"
            y="280"
            width="260"
            height="140"
            rx="15"
            fill="url(#laptopGradient)"
          />

          {/* Laptop Screen */}
          <rect
            x="140"
            y="120"
            width="220"
            height="160"
            rx="10"
            fill="url(#screenGradient)"
          />

          {/* Screen Content - Blog Interface */}
          <rect
            x="150"
            y="130"
            width="200"
            height="140"
            rx="8"
            fill="#1a1a2e"
          />

          {/* Browser Header */}
          <rect
            x="150"
            y="130"
            width="200"
            height="25"
            rx="8"
            fill="url(#headerGradient)"
          />

          {/* Browser Buttons */}
          <circle cx="165" cy="142.5" r="3" fill="#ff5f57" />
          <circle cx="175" cy="142.5" r="3" fill="#ffbd2e" />
          <circle cx="185" cy="142.5" r="3" fill="#28ca42" />

          {/* Blog Post Content */}
          <rect
            x="160"
            y="170"
            width="120"
            height="4"
            rx="2"
            fill="url(#textGradient)"
          />
          <rect
            x="160"
            y="180"
            width="180"
            height="3"
            rx="1.5"
            fill="#8b5cf6"
            opacity="0.6"
          />
          <rect
            x="160"
            y="188"
            width="160"
            height="3"
            rx="1.5"
            fill="#8b5cf6"
            opacity="0.4"
          />
          <rect
            x="160"
            y="196"
            width="140"
            height="3"
            rx="1.5"
            fill="#8b5cf6"
            opacity="0.3"
          />

          <rect
            x="160"
            y="210"
            width="100"
            height="4"
            rx="2"
            fill="url(#textGradient)"
          />
          <rect
            x="160"
            y="220"
            width="170"
            height="3"
            rx="1.5"
            fill="#3b82f6"
            opacity="0.6"
          />
          <rect
            x="160"
            y="228"
            width="150"
            height="3"
            rx="1.5"
            fill="#3b82f6"
            opacity="0.4"
          />

          {/* Floating Elements */}

          {/* Pencil Icon */}
          <g transform="translate(80, 180) rotate(-15)">
            <rect
              x="0"
              y="0"
              width="8"
              height="60"
              rx="4"
              fill="url(#pencilGradient)"
            />
            <polygon points="0,0 8,0 4,-10" fill="#fbbf24" />
            <rect x="1" y="50" width="6" height="8" rx="1" fill="#8b5f47" />
          </g>

          {/* Document Stack */}
          <g transform="translate(400, 160)">
            <rect
              x="0"
              y="5"
              width="40"
              height="50"
              rx="3"
              fill="url(#docGradient)"
              opacity="0.8"
            />
            <rect
              x="-3"
              y="2"
              width="40"
              height="50"
              rx="3"
              fill="url(#docGradient)"
              opacity="0.9"
            />
            <rect
              x="-6"
              y="0"
              width="40"
              height="50"
              rx="3"
              fill="url(#docGradient)"
            />

            {/* Document Lines */}
            <rect
              x="-2"
              y="8"
              width="25"
              height="2"
              rx="1"
              fill="white"
              opacity="0.7"
            />
            <rect
              x="-2"
              y="14"
              width="30"
              height="2"
              rx="1"
              fill="white"
              opacity="0.5"
            />
            <rect
              x="-2"
              y="20"
              width="20"
              height="2"
              rx="1"
              fill="white"
              opacity="0.6"
            />
          </g>

          {/* Chat Bubble */}
          <g transform="translate(390, 300)">
            <ellipse cx="0" cy="0" rx="35" ry="25" fill="url(#chatGradient)" />
            <polygon points="-15,20 -5,30 -10,20" fill="url(#chatGradient)" />

            {/* Chat Lines */}
            <rect
              x="-25"
              y="-8"
              width="30"
              height="2"
              rx="1"
              fill="white"
              opacity="0.8"
            />
            <rect
              x="-25"
              y="-2"
              width="25"
              height="2"
              rx="1"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="-25"
              y="4"
              width="35"
              height="2"
              rx="1"
              fill="white"
              opacity="0.7"
            />
          </g>

          {/* Heart Icon */}
          <g transform="translate(70, 320)">
            <path
              d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"
              fill="url(#heartGradient)"
              transform="scale(1.5)"
            />
          </g>

          {/* Analytics Chart */}
          <g transform="translate(50, 80)">
            <rect x="0" y="30" width="4" height="20" rx="2" fill="#8b5cf6" />
            <rect x="8" y="25" width="4" height="25" rx="2" fill="#3b82f6" />
            <rect x="16" y="15" width="4" height="35" rx="2" fill="#06d6a0" />
            <rect x="24" y="20" width="4" height="30" rx="2" fill="#f72585" />
            <rect x="32" y="10" width="4" height="40" rx="2" fill="#fbb02d" />
          </g>

          {/* Floating Notification */}
          <g transform="translate(380, 80)">
            <rect
              x="0"
              y="0"
              width="60"
              height="35"
              rx="10"
              fill="url(#notifGradient)"
            />
            <circle cx="12" cy="17.5" r="4" fill="white" opacity="0.9" />
            <rect
              x="20"
              y="12"
              width="25"
              height="2"
              rx="1"
              fill="white"
              opacity="0.8"
            />
            <rect
              x="20"
              y="18"
              width="20"
              height="2"
              rx="1"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="20"
              y="24"
              width="15"
              height="2"
              rx="1"
              fill="white"
              opacity="0.7"
            />
          </g>

          {/* Floating Tags */}
          <g transform="translate(100, 50)">
            <rect
              x="0"
              y="0"
              width="40"
              height="18"
              rx="9"
              fill="#8b5cf6"
              opacity="0.8"
            />
            <text
              x="20"
              y="12"
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontFamily="Arial"
            >
              React
            </text>
          </g>

          <g transform="translate(150, 30)">
            <rect
              x="0"
              y="0"
              width="35"
              height="18"
              rx="9"
              fill="#06d6a0"
              opacity="0.8"
            />
            <text
              x="17.5"
              y="12"
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontFamily="Arial"
            >
              Tech
            </text>
          </g>

          <g transform="translate(190, 50)">
            <rect
              x="0"
              y="0"
              width="45"
              height="18"
              rx="9"
              fill="#f72585"
              opacity="0.8"
            />
            <text
              x="22.5"
              y="12"
              textAnchor="middle"
              fill="white"
              fontSize="8"
              fontFamily="Arial"
            >
              Tutorial
            </text>
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient
              id="backgroundGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06d6a0" />
            </linearGradient>

            <linearGradient
              id="laptopGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>

            <linearGradient
              id="screenGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2d3748" />
              <stop offset="100%" stopColor="#1a202c" />
            </linearGradient>

            <linearGradient
              id="headerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <linearGradient
              id="pencilGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient
              id="docGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#06d6a0" />
              <stop offset="100%" stopColor="#048a68" />
            </linearGradient>

            <linearGradient
              id="chatGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            <linearGradient
              id="heartGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#b5179e" />
            </linearGradient>

            <linearGradient
              id="notifGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Animation Elements */}
        <div className="absolute top-12 right-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full shadow-xl animate-bounce text-xs font-medium">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Trending</span>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-full shadow-xl animate-bounce text-xs font-medium">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Smart Writing</span>
          </div>
        </div>
        <div
          className="absolute bottom-12 left-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-full shadow-xl animate-bounce text-xs font-medium"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Community</span>
          </div>
        </div>

        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full shadow-xl animate-pulse text-xs font-medium">
          <div className="flex items-center space-x-1">
            <PenTool className="w-3 h-3" />
            <span>Create</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSectionHero;
