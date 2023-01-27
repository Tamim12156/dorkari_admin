import Icon, { arrowDown, arrowLeftLine, arrowRightLine, arrowUp, increaseLeft, increaseRight } from '@libs/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styled, { withTheme } from 'styled-components';

const SubMenuComponent: FC<any> = ({ menuData }) => {
	const router = useRouter();

	return (
		<SubMenu
			onClick={() => menuData?.pageUrl && menuData?.child?.length === 0 && router.push(menuData.pageUrl)}
			prefix={menuData.prefix}
			active={router.pathname.includes(menuData.pageUrl)}
			icon={<Icon path={menuData?.iconPath} fill="#ffffff" />}
			className="my-1 rounded"
			label={menuData?.label}
		>
			{menuData?.child?.map((el, idx) => {
				if (el?.child?.length > 0) {
					return <SubMenuComponent menuData={el} key={idx} />;
				} else {
					return (
						<MenuItem
							className="my-1"
							active={router.pathname.includes(el.pageUrl)}
							onClick={() => el?.pageUrl && router.push(el.pageUrl)}
							prefix={el.prefix}
							icon={<Icon path={el?.iconPath} fill="#ffffff" />}
							key={idx}
						>
							{el.label}
						</MenuItem>
					);
				}
			})}
		</SubMenu>
	);
};

export const MainSidebar: FC<PropsType> = ({ menuData }) => {
	const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
	const [defaultCollapsed, setDefaultCollapsed] = useState(false);

	const router = useRouter();

	const handleClickFooter = () => {
		collapseSidebar();
		// console.log(collapsed);

		localStorage.setItem('sidebar_collapsed', collapsed.toString());
		// toggleSidebar()
	};

	useEffect(() => {
		const sideBarValue = localStorage.getItem('sidebar_collapsed');
		// console.log(sideBarValue);
		if (sideBarValue === 'true') {
			setDefaultCollapsed(false);
		} else {
			setDefaultCollapsed(true);
		}
	}, []);

	return (
		<SidebarWrapper defaultCollapsed={defaultCollapsed} transitionDuration={200} collapsedWidth="90px">
			<Menu
				className="pe-3 py-1"
				// renderExpandIcon={({ open }) => {
				// 	return (
				// 		<span>
				// 			{open ? (
				// 				<Icon path={arrowUp} fill="#ffffff" />
				// 			) : (
				// 				<Icon path={arrowDown} fill="#ffffff" />
				// 			)}
				// 		</span>
				// 	);
				// }}
				renderMenuItemStyles={({ level, disabled, active }) => {
					return {
						'.menu-icon': {},
						'.menu-anchor': {
							borderRadius: '0 23px 23px 0',
							backgroundColor: active ? '#0449df34' : '#1b1b1b',
							color: level === 0 ? (disabled ? 'red' : '#0092f3') : '#ffffff',
							fontSize: level === 0 ? '0.755rem' : '0.845rem',
							height: '42px',
						},
					};
				}}
			>
				{menuData?.child?.map((el, idx) => {
					if (el?.child?.length > 0) {
						return <SubMenuComponent menuData={el} />;
					} else {
						// console.log(router);
						
						return (
							<MenuItem
								onClick={() => el?.pageUrl && router.push(el.pageUrl)}
								prefix={el.prefix}
								active={router.pathname.includes(el.pageUrl) ||( (router.pathname === '/' ) && el.pageUrl === '/home')}
								className="my-1 rounded"
								icon={<Icon path={el?.iconPath} fill="#ffffff" />}
								key={idx}
							>
								{el?.label}
							</MenuItem>
						);
					}
				})}
			</Menu>
			);
			<Btn onClick={handleClickFooter}>
				<Icon path={collapsed ? increaseRight : increaseLeft} fill="#ffffff" />
			</Btn>
		</SidebarWrapper>
	);
};

const Btn = styled.button`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #0449df34;
	border: none;
	padding: 7px 0;
`;

const SidebarWrapper = styled(Sidebar)`
	height: 100%;
	position: relative;
	/* font-size: 0.875rem; */
	.sidebar-inner {
		background-color: #1b1b1b;
	}
	.sub-menu-content {
		background-color: #1b1b1b;
	}
`;

interface PropsType {
	menuData: {
		child: ChildType[];
	};
}

interface ChildType {
	label: string;
	iconPath?: string;
	child?: ChildType[];
	active?: boolean;
	prefix?: string;
	suffix?: string;
	pageUrl?: string;
}
