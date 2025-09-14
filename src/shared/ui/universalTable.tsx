'use client';

import { Table, TableProps } from 'antd';

interface UniversalTableProps<RecordType> extends TableProps<RecordType> {

}

export default function UniversalTable<RecordType extends object>({
    columns,
    dataSource,
    pagination,
    loading,
    rowKey = 'id',
    ...rest
    }: UniversalTableProps<RecordType>) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                loading={loading}
                rowKey={rowKey}
                scroll={{ x: 'max-content' }}
                {...rest}
            />
        </div>
    );
}
