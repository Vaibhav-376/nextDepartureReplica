"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const Subscribe = () => {
  const subscriptionBenefits = [
    {
      id: 1,
      title: "Mobile App & Email Alerts",
      desc: "Get flight deal alerts first via push notifications and email. More time to book before prices expire.",
    },
    {
      id: 2,
      title: "Custom Departure & Destination",
      desc: "Choose your departure city and preferred destination region. See only the deals that matter most to you.",
    },
    {
      id: 3,
      title: "Book Your Way",
      desc: "Get full booking instructions. Book directly with the airline or trusted third-party sites.",
    },
    {
      id: 4,
      title: "Get Every Flight Deal",
      desc: "Standard subscribers get every deal for their city & destination. Limited plans only get 25%.",
    },
    {
      id: 5,
      title: "30 Day Money Back Guarantee",
      desc: "Try risk-free. Full refund available within 30 days if it’s not the right fit.",
    },
  ];

  const [formData, setformData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const handleChange = (
    e
  ) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, seterror] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json();

    if (!res.ok) {
      seterror(data.error || 'Something went wrong')
      return;
    }
    setformData({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
    alert('Message sent successfully')
    redirect('/')

  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gray-500 bg-clip-text text-transparent">
          Join 200,000+ Members & Save $400+ Per Flight
        </h1>
        <p className="mt-6 text-lg sm:text-xl font-medium text-gray-600">
          Choose the plan that’s right for you
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="border border-gray-200 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Essential Plan
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Receive 4x MORE Flight Deals
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Choose Your Destination Region(s)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Choose Your Departure(s)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Access to Mobile App Features
            </li>
          </ul>
          <div className="mt-6 p-6 bg-blue-400  rounded-xl text-center text-white">
            <h3 className="text-lg font-semibold">Yearly</h3>
            <p className="text-3xl font-extrabold">$35.99</p>
            <p className="text-sm mt-2">
              Billed Annually • Cancel Anytime • 30-Day Guarantee
            </p>
          </div>
        </div>


        <div className="border border-gray-200 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Premium Plan
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Early Access to Deals
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Mistake Fares
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              Access to Private Discord
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
              100% Ad-Free
            </li>
          </ul>
          <div className="mt-6 p-6 bg-blue-400 rounded-xl text-center text-white">
            <h3 className="text-lg font-semibold">Yearly</h3>
            <p className="text-3xl font-extrabold">$59.99</p>
            <p className="text-sm mt-2">
              Billed Annually • Cancel Anytime • 30-Day Guarantee
            </p>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center mt-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Subscription Benefits
        </h2>
        <p className="text-gray-500 mb-10">Exclusive perks for members</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {subscriptionBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="p-6 bg-white rounded-2xl shadow-md transition duration-300 hover:shadow-2xl hover:shadow-blue-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm text-justify">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 bg-gray-100 mt-20 rounded-2xl">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#4dd1fe]">
            Contact Us
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">

              <label htmlFor="name" className="mb-2 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dd1fe] focus:border-[#4dd1fe] transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dd1fe] focus:border-[#4dd1fe] transition"
              />
            </div>
          </div>


          <div className="flex flex-col">
            <label htmlFor="subject" className="mb-2 font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4dd1fe] focus:border-[#4dd1fe] transition"
            />
          </div>


          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#4dd1fe] focus:border-[#4dd1fe] transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-[#4dd1fe] font-semibold rounded-lg shadow-md hover:bg-[#34b8e6] transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
