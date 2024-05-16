import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-slate-900 my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg mt-6"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg mt-6"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg mt-6"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap mt-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span className="text-slate-900">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span className="text-slate-900">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span className="text-slate-900">Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span className="text-slate-900">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span className="text-slate-900">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 w-24 border border-gray-300 rounded-lg"
              />
              <span className="text-slate-900">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                className="p-3 w-24 border border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              />
              <span className="text-slate-900">Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="p-3 border w-24 border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p className="text-slate-900">Regular Price</p>
                <span className="text-xs text-slate-800">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                className="p-3 border w-24 border-gray-300 rounded-lg"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p className="text-slate-900">Discounted Price</p>
                <span className="text-xs text-slate-800">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold mt-6 text-slate-900">
            Images:
            <span className="ml-2 font-normal text-slate-600">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full mt-6 text-slate-700"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="bg-green-900 w-60 text-white rounded-lg p-3 uppercase mt-6 hover:opacity-90 disabled:opacity-75">
              Upload
            </button>
          </div>
          <button className="p-3 border rounded-lg bg-slate-900 text-white mt-6 uppercase hover:opacity-90">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
