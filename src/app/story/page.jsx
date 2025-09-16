import Image from "next/image";

export default function Story() {
  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col items-center text-left justify-center shadow-2xl mt-10">
      <h1 className="text-3xl font-bold">Our Mission</h1>
      <p className="mt-4 text-justify">Finding the cheapest flights and travel deals to make travel more affordable for Canadians.</p>

      <h1 className="text-3xl font-bold mt-10">About Next Departure</h1>
      <p className=" mt-4 text-justify">24 hours a day, 365 days a year; we scour the web trying to find travel deals that are unusually low in price. We are known to find them first! Once we’ve found an amazing deal, we notify you immediately. Make sure you’re signed up for the e-mail alerts and follow us on social media. Then just like that, you’re off to your dream destination by easily saving at least 30%-70% off average prices!</p>

      <h1 className="text-3xl font-bold mt-10">Our Story</h1>
      <Image
        src="https://placehold.co/600x400"
        alt="Our Story"
        width={600}
        height={300}
        className="mt-4 mb-5"
      />
      <p className="mt-4 text-justify">We are the couple that is behind saving you hundreds of dollars on travel. Rishi is the mastermind that has been finding and posting amazing cheap flight and travel deals on Facebook travel groups. Farah is the travel guru that handles all technical operations and marketing for the back-end of the Next Departure platform and social media. Neither of us are travel agents nor do we work for any airline or tour company. We’re just two passionate travelers who want to make travel affordable for everyone.</p>

      <Image
        src="/ourstory.jpg"
        alt="Our Story"
       width={600}
       height={300}
        className="mt-10"
      />
      <p className="mt-20 text-justify">In the recent past, we have traveled to South Africa and Abu Dhabi for $350 CAD, Spain, and Portugal for $375, Paris for $250 and Orlando for $160,  We never thought we’d be able to see the world for so cheap, but along the way we’ve picked up some tricks and techniques that allow me to find and post these amazing deals. We take great pride in finding these cheap deals ourselves and finding them first, but more importantly helping fellow travelers travel the world for cheap!</p>
      <p className="mt-10 text-justify">
        We’ve heard some incredible stories on how the deals Rishi has posted help you go on your dream vacation or reunite with family you haven’t seen in years, which is why we created this site. Rishi will continue to post amazing deals, including airfare, hotels, and all-inclusive deals. Canadian cities that we will cover include Toronto, Vancouver, Calgary, Edmonton, Winnipeg, Ottawa, Montreal, and Halifax. You can now receive free email alerts, follow us Twitter and on our Facebook page and view all the deals we post on our site.
      </p>

      <h1 className="text-3xl font-bold mt-10">Contact</h1>
      <p className="mt-4">Email: <a href="mailto:VdZvW@example.com">VdZvW@example.com</a></p>
    </div>
  );
}
