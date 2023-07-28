import { Dialog, Transition } from '@headlessui/react';
import axios from "axios";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useMemo,
  useState
} from "react";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState({});
  const [logged, setLogged] = useState(true);

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        'https://fastapi-ht4s.onrender.com/auth/users/tokens',
        new URLSearchParams(credentials).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('An error occurred:', error.response.data);
      throw error;
    }
  };

  const registerUser = async (credentials) => {
    try {
      const response = await axios.post('https://fastapi-ht4s.onrender.com/auth/users', credentials, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('An error occurred:', error.response.data);
      throw error;
    }
  };

  const registerBtn = () => {
    setLogged(false);
  };

  const loggedInBtn = () => {
    setLogged(true);
  }

  const handleSubmit = async (e) => {
    if (logged) {
      e.preventDefault();
      try {
        const token = await loginUser({ "username": userName, "password": password });
        localStorage.setItem("token", token.access_token);
        setToken(token);

        if (token) {
          console.log('Logged in successfully!');
          window.alert('Login successful!');
          window.location.reload();
        } else {
          window.alert('Login failed');
          console.log('Login failed.');
        }
      } catch (error) {
        window.alert('An error occurred');
        console.log('An error occurred:', error);
      }
    } else {

      e.preventDefault();
      try {
        const res = await registerUser({ "email": userName, "password": password });
        console.log('Registered successfully!');
      } catch (error) {
        console.log('An error occurred:', error);
      }

    };
  };
  

  return (
    <Transition appear show={showSignInModal} as={Fragment}>
      <Dialog as="div" className="relative z-40" open={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 transition-all">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
                  <Image
                    src="/hp11.png"
                    alt="Logo"
                    className="h-10 w-10 rounded-full"
                    width={20}
                    height={20}
                  />
                  <h3 className="font-display text-2xl font-bold">Sign In</h3>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className="bg-white px-4 py-6 space-y-4">
                  <input
                    type="email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={loggedInBtn}
                    type="submit"
                    className="w-full py-2 px-4 bg-[#ffd700] text-black rounded-md hover:[#ffd700]"
                  >
                    Login
                  </button>
                  <button
                    onClick={registerBtn}
                    className="w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Register
                  </button>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}

