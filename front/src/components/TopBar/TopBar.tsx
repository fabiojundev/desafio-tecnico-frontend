import {
  TopBarContainer,
  ReloadButton,
} from "./TopBar.styles";

interface ITopBarProps {
  loading: boolean;
  msg: string;
}

function TopBar({ loading, msg }: ITopBarProps) {

  const reloadPage = () => {
    window.location.reload(false);
  };
  return (
    <TopBarContainer>
      {loading && <div>Carregando...</div>}
      {msg && 
        <>
          {msg}
          <ReloadButton onClick={reloadPage}> Recarregar Página</ReloadButton>
        </>
      }
    </TopBarContainer>
  );
}

export default TopBar;
