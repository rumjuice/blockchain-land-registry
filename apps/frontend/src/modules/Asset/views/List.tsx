import { FC, useCallback, useEffect, useState } from "react";
import { Card, CreateAssetModal, TransferModal } from "../components";
import { createAsset, getAssets, transferAsset } from "../repos";
import { Asset, GetAsset, Transfer } from "../Types";

const List: FC = () => {
  const [assets, setAssets] = useState<GetAsset[]>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [transferModal, setTransferModal] = useState<string>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      alert(await error.response.json());
    }
  }, []);

  const onCreateClose = useCallback(() => {
    setCreateModal(false);
  }, []);

  const onCreateAsset = useCallback(async (data: Asset) => {
    try {
      await createAsset(data);
      fetchData();
    } catch (error) {
      alert(await error.response.json());
    }
    onCreateClose();
  }, []);

  const onTransferClose = useCallback(() => {
    setTransferModal(undefined);
  }, []);

  const onTransferAsset = useCallback(async (data: Transfer) => {
    try {
      await transferAsset(data);
    } catch (error) {
      alert(await error.response.json());
    }
    onTransferClose();
  }, []);

  return (
    <div className="flex w-full h-full mt-8 gap-4">
      <CreateAssetModal
        onClose={onCreateClose}
        show={createModal}
        onSubmit={onCreateAsset}
      />
      <TransferModal
        onClose={onTransferClose}
        show={transferModal}
        onSubmit={onTransferAsset}
      />
      <section className="flex-initial">
        <iframe
          className="h-full max-h-screen xl:min-w-[30rem] lg:min-w-[25rem] md:min-w-[20rem]"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5613.513741277526!2d-79.41348504077459!3d43.67592552614158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1655441998679!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          tabIndex={0}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      <section className="flex flex-col w-full gap-2">
        <div className="flex p-2">
          <h2 className="text-lg text-center font-medium text-emerald-900">
            Asset List
          </h2>
          <button
            className="ml-auto max-w-fit inline-flex justify-center px-4 py-1 text-sm font-medium text-emerald-900 bg-emerald-100 border border-transparent rounded-md hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            onClick={() => setCreateModal(true)}
          >
            Create Asset
          </button>
        </div>

        <div className="flex flex-col gap-4 h-full overflow-y-auto max-h-screen">
          {assets && assets.length > 0 ? (
            assets.map((asset) => (
              <Card
                key={asset.Key}
                {...asset.Record}
                onClick={() => setTransferModal(asset.Key)}
              />
            ))
          ) : (
            <h2 className="p-4 mt-4">
              No assets registered. Please create new asset.
            </h2>
          )}
        </div>
      </section>
    </div>
  );
};

export default List;
