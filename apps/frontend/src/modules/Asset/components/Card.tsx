import { FC, memo } from "react";
import { Asset, AssetStatus } from "../Types";
import Status from "./Status";

interface Props {
  onTransfer(): void;
  onHold(): void;
  onRelease(): void;
}

const Card: FC<Asset & Props> = ({
  assetID,
  owner,
  area,
  location,
  status,
  onTransfer,
  onHold,
  onRelease,
}) => {
  return (
    <div className="flex items-center rounded-xl shadow-md px-4 py-2 gap-4 bg-white">
      <div className="flex-none w-1/5">
        <Status status={status as AssetStatus} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-bold">{location}</span>
        <span className="font-medium text-sm text-slate-800">
          Owned by {owner}
        </span>
        <span className="text-sm text-slate-500">{area} m2</span>
        <span className="text-xs text-slate-500">{assetID}</span>
      </div>
      <div className="ml-auto flex flex-col items-center justify-center gap-2">
        {status === AssetStatus.REGISTERED && (
          <>
            <button
              className="min-w-full inline-flex justify-center px-4 py-1 text-sm font-medium text-white bg-emerald-700 border border-transparent rounded-md hover:bg-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
              onClick={onTransfer}
            >
              Transfer
            </button>

            <button
              className="min-w-full inline-flex justify-center px-4 py-1 text-sm font-medium text-white bg-red-700 border border-transparent rounded-md hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={onHold}
            >
              Hold
            </button>
          </>
        )}
        {status === AssetStatus.LOCKED && (
          <button
            className="min-w-full inline-flex justify-center px-4 py-1 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={onRelease}
          >
            Release
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Card);
