"use client"

import React, { useState } from "react";

const Support = () => {

    const [openIndex, setOpenIndex] = useState(false);
    const toggleFAQ = (i) => {
        setOpenIndex(openIndex === i ? false : true);
    };

    const faqs = [
        { id: 1, question: "How do I cancel my Subsciption" },
        { id: 2, question: "How do I subscribe" },
        { id: 3, question: "How Many deal notification will i get" },
        { id: 4, question: "Why haven't I received any deals from you?" },
    ]

    const general = [
        { id: 1, question: "Can I select Specific Dates?" },
        { id: 2, question: "Do You find hotel, vacation or curises deals" },
        { id: 3, question: "Do You find deals from canada?" },
        { id: 4, question: "Do you only post out economy fare deals?" },
        { id: 5, question: "From which cities do you find flights from?" }
    ]

    const billing = [
        { id: 1, question: "It’s not letting me update my credit card" },
        { id: 2, question: "What is your refund policy?" },
        { id: 3, question: "Will my subscription automatically renew?" }
    ]

    const technical = [
        { id: 1, question: "How do I download the app?" },
        { id: 2, question: "Where is the Facebook login?" },
        { id: 3, question: "Why am I not receiving email notifications?" },
        { id: 4, question: "Why am I not receiving push notifications?" },
        { id: 5, question: "Why is my subscription not active?" },
    ]

    const stillquestion = [
        { id: 1, question: "I still have questions. How do I contact you?" },
    ]



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        howCanWeHelp: "",
        description: "",
        subscription: "",
        howSubscribe: "",
        device: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus("✅ Submitted successfully!");
            } else {
                setStatus(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setStatus("❌ Something went wrong.");
        }
    };


    return (
        <div className="px-4 py-10">

            <div className="flex items-center justify-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    We're here to help!
                </h1>
            </div>


            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl shadow bg-white">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Find quick answers to common questions about our services.
                    </p>
                    <h1 className="mt-10 font-bold text-xl">Subscirption</h1>
                    {faqs.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                    <h1 className="mt-10 font-bold text-xl">General</h1>
                    {general.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                    <h1 className="mt-10 font-bold text-xl">Billing</h1>
                    {billing.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}

                    <h1 className="mt-10 font-bold text-xl">Technical</h1>
                    {technical.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}

                    <h1 className="mt-10 font-bold text-xl">Still Got Questions?</h1>
                    {stillquestion.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-2xl shadow bg-white max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Can’t find what you’re looking for? Reach out to our support team.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                How can we help? <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="howCanWeHelp"
                                value={formData.howCanWeHelp}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200">
                                <option value="">Select an option</option>
                                <option value="cancel">Cancel Subscription</option>
                                <option value="notifications">Not Receiving Notifications</option>
                                <option value="subscription">Doesn't Recognize Subscription</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Please describe <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="3"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Cancel subscription, Not receiving notifications, Doesn’t recognize my subscription, etc."
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Do you have a subscription?
                            </label>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2">
                                    <input type="radio"
                                        name="subscription"
                                        value="yes"
                                        checked={formData.subscription === "yes"}
                                        onChange={handleChange} />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="subscription"
                                        value="yes"
                                        checked={formData.subscription === "yes"}
                                        onChange={handleChange} />
                                    No
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                How did you subscribe?
                            </label>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="howSubscribe"
                                        value="stripe"
                                        checked={formData.howSubscribe === "stripe"}
                                        onChange={handleChange}
                                    />
                                    Next Departure Website Stripe
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="howSubscribe"
                                        value="ios"
                                        checked={formData.howSubscribe === "ios"}
                                        onChange={handleChange}
                                    />
                                    iOS
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio"
                                        name="howSubscribe"
                                        value="google"
                                        checked={formData.howSubscribe === "google"}
                                        onChange={handleChange} />
                                    Google Play
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Device Type and Model
                            </label>
                            <input
                                type="text"
                                placeholder="iPhone 13, S22+, etc"
                                value={formData.deviceType}
                                onChange={handleChange}
                                name="deviceType"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-400 text-white font-medium py-2 rounded-md hover:bg-sky-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
