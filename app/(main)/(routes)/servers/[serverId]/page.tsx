interface ServerIdprops{
  params: {serverId:string}
}
const ServerIdPage = ({params}:ServerIdprops) => {
    return <div>welcome to Server {params.serverId}</div>;
  };
  
export default ServerIdPage;
  