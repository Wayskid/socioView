import "../../styles/loader.scss";

export default function Loader({ bgColor }: { bgColor?: String }) {
  return (
    <div className="border-none justify-self-center">
      <div className="pl1">
        <div className={`pl1__a ${bgColor}`}></div>
        <div className={`pl1__b ${bgColor}`}></div>
        <div className={`pl1__c ${bgColor}`}></div>
      </div>
    </div>
  );
}
