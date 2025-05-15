import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Video,
  Info,
  Bell,
  Sun,
  Search,
  MessageSquare,
  Users,
  Plus,
  Smile,
  Paperclip,
  Mic,
  Send,
} from "lucide-react"
import { useEffect } from "react"
import {useNavigate } from "react-router-dom"



export default function LandingPage() {
  const navigate = useNavigate()
  const nav = (text)=>{
    navigate(text)
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Connect with <span className="text-green-500">anyone</span>, anywhere
              </h1>
              <p className="text-xl text-gray-600">
                ChatMate brings people together through seamless, real-time messaging. Stay connected with friends,
                family, and colleagues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 cursor-pointer" onClick={() => nav("/signup")}>
                  Get Started — It's Free
                </Button>
                {/* <Button size="lg" variant="outline">
                  Learn More
                </Button> */}
                <button type="button" className="border-[1px] border-gray-300 px-5 text-black rounded-md hover:bg-gray-300 hover:text-white cursor-pointer">learn More</button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full max-w-[650px] mx-auto shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
                <AppPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ChatMate?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with you in mind, offering features that make communication effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-green-500" />}
              title="Real-time Messaging"
              description="Send and receive messages instantly with our lightning-fast messaging system."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-green-500" />}
              title="Group Conversations"
              description="Create groups for friends, family, or work teams to stay connected."
            />
            <FeatureCard
              icon={<Phone className="h-10 w-10 text-green-500" />}
              title="Voice & Video Calls"
              description="Connect face-to-face with crystal clear audio and video calls."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">What Our Users Say</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ChatMate has completely transformed how our team communicates. It's intuitive and reliable."
              author="Rohini Sharma"
              role="Product Manager"
            />
            <TestimonialCard
              quote="I love how easy it is to share documents and media. The interface is clean and user-friendly."
              author="Maya Jackson"
              role="Graphic Designer"
            />
            <TestimonialCard
              quote="The best chat app I've used. The mobile experience is just as good as desktop!"
              author="Robert Flores"
              role="Software Engineer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start chatting?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of people who use ChatMate to stay connected with the people who matter most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100 cursor-pointer" onClick={() => nav("/login")}>
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-600">
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-green-500 mb-4">ChatMate</div>
              <p className="max-w-md">Connecting people through seamless communication since 2023.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-green-500">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-500">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2025 ChatMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AppPreview() {
  return (
    <div className="flex flex-col h-[600px]">
      {/* App Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-green-500">ChatMate</div>
          <Bell className="h-5 w-5 text-gray-500" />
          <Sun className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-500 font-medium">L</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Lea</div>
              <div className="text-xs text-green-500">Online</div>
            </div>
          </div>
          <Phone className="h-5 w-5 text-gray-500" />
          <Video className="h-5 w-5 text-gray-500" />
          <Info className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* App Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-gray-200 bg-white flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 bg-gray-100 border-0" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="flex-1 py-3 text-green-500 font-medium border-b-2 border-green-500 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Chats</span>
            </button>
            <button className="flex-1 py-3 text-gray-500 font-medium flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              <span>Contacts</span>
            </button>
          </div>

          {/* Recent Chats */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Recent Chats</h3>
            <button className="text-green-500">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            <ChatListItem name="Rohini Sharma" message="Hey there! How are you doing?" time="10:30 AM" active />
            <ChatListItem name="Lea Anderson" message="Let's go out!" time="9:15 AM" />
            <ChatListItem name="Maya Jackson" message="Can you bring the documents?" time="6:45 PM" />
            <ChatListItem name="Kristen Watson" message="See you at the party!" time="4:20 PM" unread />
            <ChatListItem name="Robert Flores" message="Don't forget about our meeting" time="2:10 PM" />
          </div>

          {/* Current User */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 font-medium">A</span>
              </div>
              <div>
                <div className="text-sm font-medium">Angela Davis</div>
                <div className="text-xs text-green-500">Online</div>
              </div>
            </div>
            <button className="text-gray-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex justify-center mb-4">
              <div className="text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1">Today</div>
            </div>

            {/* Received Message */}
            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-500 text-xs font-medium">L</span>
              </div>
              <div>
                <div className="bg-white text-[var(--accent)] rounded-lg p-3 shadow-sm">
                  <p>I have reception plan in Ladakh for next week</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">10:35 AM</div>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex items-end justify-end gap-2 max-w-[80%] ml-auto">
              <div>
                <div className="bg-green-500 text-white rounded-lg p-3 shadow-sm">
                  <p>Let's go out, what's the plan?</p>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">10:40 AM</div>
              </div>
            </div>

            {/* Received Message */}
            <div className="flex items-end gap-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                <span className="text-green-500 text-xs font-medium">L</span>
              </div>
              <div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-[var(--accent)]">No I understand</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">10:42 AM</div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="text-gray-500">
                <Smile className="h-6 w-6" />
              </button>
              <button className="text-gray-500">
                <Paperclip className="h-6 w-6" />
              </button>
              <Input placeholder="Type a message..." className="flex-1 bg-gray-100 border-0" />
              <button className="text-gray-500">
                <Mic className="h-6 w-6" />
              </button>
              <button className="bg-green-500 text-white p-2 rounded-full">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatListItem({ name, message, time, active, unread }) {
  return (
    <div className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${active ? "bg-gray-50" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 font-medium">{name.charAt(0)}</span>
          </div>
          {unread && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">1</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 ">
          <div className="flex justify-between items-center">
            <h4 className="font-medium truncate text-[var(--accent)]">{name}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-500 truncate">{message}</p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="mb-4 text-green-500">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-medium text-black">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  )
}
