'use client';

import { DataTableColumn } from '@/components/data-table/column';
import Link from '@/components/link';
import { useBotList } from '@/contracts/bot/client';
import { ShortBot } from '@/contracts/bot/schema';
import { useState } from 'react';
import { t } from 'i18next';
import DataTable from '@/components/data-table';

const columns: DataTableColumn[] = [
  {
    field: 'id',
    name: 'Id',
    hiddenBetween: { start: 'xs', end: 'md' },
  },
  {
    field: 'name',
    name: 'Name',
  },
  {
    field: 'paynetUrl',
    name: 'Url',
    hiddenBetween: { start: 'xs', end: 'md' },
  },
  {
    field: 'paynetEndpoint',
    name: 'Endpoint',
    align: 'right',
  },
  {
    field: 'detail',
    name: '',
    align: 'right',
  },
];

interface BotListProps {
  list?: ShortBot[];
}

export default function BotList(props: BotListProps) {
  const [pageNumber, setPageNumber] = useState(0);
  const [size, setSize] = useState(10);
  const [botList, , loading] = useBotList({ pageNumber, size }, props);

  const getBody = () => botList?.list?.map((row) => ({
    ...row,
    detail: <Link href={`/bot/${row?.id}`}>{t`link.detail`}</Link>,
  })) || [];

  return (
    <DataTable
      columns={columns}
      rows={getBody()}
      loading={loading}
      emptyText={t`table.empty` as string}
      pagination={{
        pageNumber,
        setPageNumber,
        size,
        setSize,
      }}
    />
  );
}
