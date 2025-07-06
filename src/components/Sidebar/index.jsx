import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoIcon from '~/assets/images/logo-icon.svg';
import {
  IconSmartHome,
  IconUser,
  IconLibrary,
  IconCurrencyDollar,
  IconBolt,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { cn } from '~/core/utils/cn';
import { Button } from '~/core/ui/shadcn/components/ui/button';
import { DropdownSelector } from '~/core/ui/DropdownSelector';
import { useAuth } from '~/hooks/useAuth';
import { Tooltip } from '~/core/ui/Tooltip';

export const SIDEBAR_WIDTH = 236;

const navItems = [
  { label: 'Torneios', icon: IconSmartHome, to: '/tournaments' },
  { label: 'Jogadores', icon: IconUser, to: '/players' },
  { label: 'Clubes', icon: IconLibrary, to: '/clubs' },
  { label: 'Pagamentos', icon: IconCurrencyDollar, to: '/payments' },
  { label: 'Atividades', icon: IconBolt, to: '/activities' },
  { label: 'Configurações', icon: IconSettings, to: '/settings' },
];

const orgOptions = [
  { value: 'padel', label: 'Aberto de Padel', image: logoIcon },
  { value: 'futsal', label: 'Futsal Liga', image: logoIcon },
  { value: 'tenis', label: 'Open de Tênis', image: logoIcon },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const { currentUser } = useAuth();

  const [org, setOrg] = useState('padel');

  return (
    <div
      className={
        'fixed top-0 left-0 z-30 flex h-screen flex-col justify-between overflow-y-auto border-r bg-white transition-all duration-100 ease-in-out'
      }
      style={{
        width: collapsed ? '80px' : `${SIDEBAR_WIDTH}px`,
      }}
    >
      {/* Top: Logo + Collapse button */}
      <div className="flex flex-col gap-2 px-4">
        <div className="mt-4 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logoIcon}
              alt="Placar"
              className={`h-8 w-8 rounded ${collapsed && 'ml-2'}`}
            />
            {!collapsed && (
              <span className="text-base font-bold transition-all">Placar</span>
            )}
          </div>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-1"
              onClick={() => setCollapsed((v) => !v)}
              tabIndex={0}
              aria-label={collapsed ? 'Expandir menu' : 'Colapsar menu'}
            >
              <IconChevronLeft size={20} />
            </Button>
          )}
        </div>
        <div className="flex h-5 items-center gap-2">
          {!collapsed ? (
            <span className="text-xs text-gray-500">Organização</span>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="ml-1"
              onClick={() => setCollapsed((v) => !v)}
              tabIndex={0}
              aria-label={collapsed ? 'Expandir menu' : 'Colapsar menu'}
            >
              <IconChevronRight size={20} />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center">
          <DropdownSelector
            value={org}
            setValue={setOrg}
            options={orgOptions}
            collapsed={collapsed}
            className="border border-gray-200"
          />
        </div>
        {/* Navigation */}
        <nav className="flex w-full flex-col items-center justify-center">
          <ul className={!collapsed ? 'w-full' : 'w-10 space-y-1'}>
            {navItems.map((item) => (
              <li key={item.label} className="w-full">
                <Tooltip text={item.label} show={collapsed}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'hover:bg-muted group relative flex h-10 items-center gap-2 rounded-md p-2 text-sm font-medium transition',
                        isActive
                          ? 'bg-muted text-primary font-semibold'
                          : 'text-muted-foreground',
                        collapsed && 'justify-center px-2',
                      )
                    }
                  >
                    <item.icon size={22} />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={cn(
          'mt-6 flex items-center gap-2 px-4 py-2 transition-all',
          collapsed && 'justify-center px-2',
        )}
      >
        <img
          src="https://randomuser.me/api/portraits/men/30.jpg"
          alt="User"
          className="h-8 w-8 rounded-full border"
        />
        {!collapsed && (
          <span className="text-sm font-medium">{currentUser?.name}</span>
        )}
      </div>
    </div>
  );
}
