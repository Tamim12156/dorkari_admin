import { Header, MainSidebar } from '@components/common';
import { boxChart, Home, menu, user } from '@libs/icons';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const MainLayout: FC<PropsType> = ({ children }) => {
	return (
		<>
			<Header />
			<Wrapper>
				<SidebarWrapper>
					<MainSidebar menuData={menuData} />
				</SidebarWrapper>

				<MainWrapper className='py-2'>{children}</MainWrapper>
			</Wrapper>
		</>
	);
};

const MainWrapper = styled.div`
	width: 100%;
	max-height: 91vh;
	overflow-y: auto;
    padding: 0 1rem;
`;

const SidebarWrapper = styled.div`
	height: calc(100vh - 56px);
	max-height: 100vh;
`;

const Wrapper = styled.div`
	display: flex;
	height: calc( 100vh - 60px );
`;

type PropsType = {
	children: ReactNode;
};

const menuData = 
	{
		child: [
			{
				label: 'Home',
				iconPath: Home,
				prefix:"🔥",
				suffix:"🔥",
				pageUrl:'/home'
			},
			{
				label: 'Users List',
				iconPath: user,
				suffix:"🔥",
				pageUrl:'/user-list'
			},
			{
				label: 'Order List',
				iconPath: user,
				pageUrl:'/order-list'
			},
			{
				label: 'Booking List',
				iconPath: user,
				pageUrl:'/booking-list'
			},
			{
				label: 'All Servies',
				iconPath: boxChart,
				pageUrl:'/all-services',
				child: [
					{
						label: 'Add Categories',
						iconPath: boxChart,
						prefix:"🔥",
						suffix:"🔥",
						pageUrl:'/all-services/add-categories',
						// child: [
						// 	{
						// 		label: 'Inner child 1',
						// 		iconPath: boxChart,
						// 		suffix:"🔥",
						// 		child: [
						// 			{
						// 				label: 'Inner child 2',
						// 				iconPath: boxChart,
						// 				suffix:"🔥",
						// 				child: [
						// 					{
						// 						label: 'Inner child 3',
						// 						iconPath: boxChart,
						// 						suffix:"🔥",
						// 						child: [
						// 							{
						// 								label: 'Inner child 4',
						// 								iconPath: boxChart,
						// 								suffix:"🔥"
						// 							},
						// 						],
						// 					},
						// 				],
						// 			},
						// 		],
						// 	},
						// ],
					},
					{
						label: 'Add Service',
						iconPath: boxChart,
						prefix:"🔥",
						suffix:"🔥",
						pageUrl:'/all-services/add-service',
						
					},
					{
						label: 'Add Property',
						iconPath: boxChart,
						pageUrl:'/all-services/add-property',
						
					},
				],
			},
			{
				label: 'Add Menu',
				iconPath: menu,
				pageUrl:'/add-menu'
			},
		],
	};
	
