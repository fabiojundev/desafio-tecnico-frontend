import {
  TopBarContainer,
} from "./TopBar.styles";

interface ITopBarProps {
  loading: boolean;
  msg: string;
}

function TopBar({ loading, msg }: ITopBarProps) {

  return (
    <TopBarContainer>
      {loading && <div>Carregando...</div>}
      {msg && <div>{msg}</div>}
    </TopBarContainer>
  );
}

export default TopBar;
