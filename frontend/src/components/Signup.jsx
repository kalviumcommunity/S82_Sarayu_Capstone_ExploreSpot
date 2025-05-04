import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [file, setFile] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault(); // prevent default form reload
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      // formData.append("profile", file);
      console.log(formData);
      const res = await axios.post(' http://localhost:5000/api/signup', formData);
      console.log(res.data); // show success or navigate
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSignup}>
      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your mail"
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your password"
        />
      </div>
      {/* <div>
        <label className="block text-sm">Profile Picture</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mt-1 text-white"
        />
      </div> */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 transition-all p-2 rounded text-white font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;