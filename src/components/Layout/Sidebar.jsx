import { Link, NavLink } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import api from '~/core/api';
import ActivityIndicator from '~/core/ui/ActivityIndicator';
import { SignOutButton } from '~/components/SignOutButton';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import robotStream from '../../assets/images/robot-stream.png';
import { useContext } from 'react';
import { LayoutContext } from '~/contexts/LayoutContext';

const menuItems = [
  {
    icon: <DashboardIcon className="w-6 text-gray-400" />,
    name: 'Dashboard',
    path: '/app',
  },
  {
    icon: <ArticleIcon className="w-6 text-gray-400" />,
    name: 'Documentation',
    path: '/app/documentations',
  },
  {
    icon: <img src={robotStream} className="h-6 w-6" alt="AI" />,
    name: 'Ask AI',
    path: '/app/ask_ai',
  },
];

export const Sidebar = () => {
  const { currentUser } = useAuth();
  const { menuVisible, handleMenu } = useContext(LayoutContext);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => api.get('/tickets').then((res) => res.data),
  });

  return (
    <div className={menuVisible ? 'side-bar' : 'side-bar -translate-x-full'}>
      <div className="flex h-full flex-col">
        <div className="h-14">
          <div
            className={
              menuVisible
                ? 'absolute left-70 rounded-r-full bg-zinc-800 pr-2 sm:hidden'
                : 'hidden'
            }
          >
            <button
              onClick={handleMenu}
              className="rounded-full bg-zinc-700/50 p-2 text-white"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex h-14 items-center border-b border-black/20 p-4 shadow-md">
            <input
              type="text"
              placeholder="Find a ticket..."
              className="input w-full"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto p-2">
          {menuItems?.map(({ name, path, icon }, index) => (
            <NavLink
              key={index}
              to={path}
              end
              onClick={handleMenu}
              className={({ isActive }) =>
                `flex items-center rounded-md px-2 py-2 hover:bg-[#393c43] ${isActive ? 'bg-[#40444b] text-white' : 'text-gray-300'}`
              }
            >
              {icon}
              <span className="ml-2">{name}</span>
            </NavLink>
          ))}

          <div className="flex h-12 items-center gap-2 px-2">
            <h3 className="flex-1 text-xs font-bold text-gray-400 uppercase">
              Direct Messages
            </h3>
            <Link to="/app/tickets" onClick={handleMenu}>
              <AddIcon className="mb-1 text-gray-400 transition duration-75 hover:text-white" />
            </Link>
          </div>
          <ul className="space-y-1">
            {isLoading && (
              <div className="flex w-full justify-center p-4">
                <ActivityIndicator />
              </div>
            )}
            {!isLoading &&
              tickets.map(({ id, name, avatar }) => (
                <li key={id}>
                  <NavLink
                    to={`/app/tickets/${id}`}
                    className={({ isActive }) =>
                      `flex items-center rounded-md p-2 hover:bg-[#393c43] ${
                        isActive
                          ? 'relative bg-[#40444b] text-white'
                          : 'text-gray-300'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 h-5 w-1 rounded-r-full bg-white"></span>
                        )}
                        <img
                          src={avatar || `https://i.pravatar.cc/40?u=${name}`}
                          alt={name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span
                          className={`ml-3 text-base ${isActive ? 'font-semibold' : ''}`}
                        >
                          {name}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>

        <div className="m-2 flex items-center justify-between rounded-md bg-[#292b2f] p-2">
          <div className="flex items-center">
            <img
              src={`https://i.pravatar.cc/40?u=${currentUser?.firstName || 'user'}`}
              alt={currentUser?.firstName}
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-2">
              <p className="text-sm font-semibold text-white">
                {currentUser?.firstName}
              </p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <SignOutButton labelType="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
