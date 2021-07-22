import { Avatar } from '@/components/Avatar';
import { openModal } from '@/components/Modal';
import { Icon } from '@iconify/react';
import React, { useCallback, useMemo } from 'react';
import { GroupInfo, useAppSelector } from 'tailchat-shared';
import { NavbarNavItem } from './NavItem';

function useGroups(): GroupInfo[] {
  const groups = useAppSelector((state) => state.group.groups);
  return useMemo(
    () => Object.entries(groups).map(([_, group]) => group),
    [groups]
  );
}

export const GroupNav: React.FC = React.memo(() => {
  const groups = useGroups();

  const handleCreateGroup = useCallback(() => {
    openModal(<div className="w-60 h-48">新增群组</div>);
  }, []);

  return (
    <div className="space-y-2">
      {Array.isArray(groups) &&
        groups.map((group) => (
          <NavbarNavItem key={group._id}>
            <Avatar
              shape="square"
              size={48}
              name={group.name}
              src={group.avatar}
            />
          </NavbarNavItem>
        ))}

      {/* 创建群组 */}
      <NavbarNavItem className="bg-green-500" onClick={handleCreateGroup}>
        <Icon className="text-3xl text-white" icon="mdi-plus" />
      </NavbarNavItem>
    </div>
  );
});
GroupNav.displayName = 'GroupNav';
