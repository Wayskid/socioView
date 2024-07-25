import moment from "moment";
import { useAppSelector } from "../../../reduxHooks";
import { useGetSocioViewNewsQuery } from "../../../services/socioViewNewsApi";
import Loader from "../../../components/ui/Loader";

export default function SocioViewNews() {
  //Get socioView news
  const { data: socioViewNewsResult } = useGetSocioViewNewsQuery(undefined);

  //Access light or dark mode
  const darkMode = useAppSelector((state) => state.app.darkMode);

  return (
    <div
      className={`grid gap-3 p-3 rounded-t-lg ${
        darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      <p className="text-xl font-medium">SocioView News</p>
      <ul className="newsBody grid gap-3">
        {socioViewNewsResult ? (
          socioViewNewsResult.articles
            .slice(0, 4)
            .map((n: { title: String; publishedAt: String }, i: Number) => {
              return (
                <li className="text-sm" key={i.toString()}>
                  <p>{n.title}</p>
                  <p className="italic">
                    {moment(n.publishedAt.toString(), "YYYYMMDD").fromNow()}
                  </p>
                </li>
              );
            })
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
}
