import AddSideBarMenu from '@components/AddSideBarMenu';
import type { NextPage } from 'next';
import styled from 'styled-components';

const AddMenu: NextPage = () => {
	return (
		<Wrapper>
			<AddSideBarMenu />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 0.425rem;
	height: 100%;
	/* margin: 13px 0; */
`;

export default AddMenu;
