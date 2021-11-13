import React, { FunctionComponent } from 'react';
import { Container, ContainerProps } from '@chakra-ui/react';

interface IProps extends ContainerProps {}

const PageContainer: FunctionComponent<IProps> = ({
  children,
  display = 'flex',
  flexDirection = 'column',
  maxW = '1600px',
  pt = 6,
  flexGrow = 1,
  ...restProps
}) => (
  <Container
    data-name="page-container"
    pt={pt}
    maxW={maxW}
    flexGrow={flexGrow}
    display={display}
    flexDirection={flexDirection}
    {...restProps}>
    {children}
  </Container>
);

export default PageContainer;
