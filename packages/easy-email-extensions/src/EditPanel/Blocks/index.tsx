import { Collapse, Grid, Space, Typography } from '@arco-design/web-react';
import { AdvancedType, BlockManager, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo, useState } from 'react';
import { IconCaretRight, IconCaretUp } from '@arco-design/web-react/icon';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import styles from './index.module.scss';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

export function Blocks() {
  const { categories } = useExtensionProps();

  const defaultActiveKey = useMemo(
    () => [...categories.filter(item => item.active).map(item => item.label)],
    [categories],
  );
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      bordered={false}
      expandIcon={
        <svg
          width='20'
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.25 8.625L12.5 15.375L5.75 8.625'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      }
      expandIconPosition='right'
    >
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: '0px 0px' }}
              name={cat.label}
              header={cat.label}
              className={styles.collapseItem}
            >
              <Space direction='vertical'>
                <div />
              </Space>
              {cat.blocks.map(item => (
                <LayoutItem
                  key={item.title}
                  title={item.title || ''}
                  columns={item.payload}
                />
              ))}
            </Collapse.Item>
          );
        }

        if (cat.displayType === 'custom') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
              name={cat.label}
              header={cat.label}
            >
              <Grid.Row>
                {cat.blocks.map((item, index) => {
                  return <React.Fragment key={index}>{item}</React.Fragment>;
                })}
              </Grid.Row>
            </Collapse.Item>
          );
        }
        return (
          <Collapse.Item
            key={index}
            contentStyle={{
              padding: 0,
              paddingBottom: 0,
              paddingTop: 15,
              paddingRight: 15,
              paddingLeft: 15,
            }}
            name={cat.label}
            header={cat.label}
          >
            <>
              {cat.blocks.map((item, index) => {
                return (
                  <BlockItem
                    key={index}
                    {...(item as any)}
                  />
                );
              })}
            </>
          </Collapse.Item>
        );
      })}
    </Collapse>
  );
}

function BlockItem({
  type,
  payload,
  title,
  filterType,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
}) {
  const block = BlockManager.getBlockByType(type);

  return (
    <div className={styles.blockItem}>
      <BlockAvatarWrapper
        type={type}
        payload={payload}
      >
        <div className={styles.blockItemContainer}>
          <svg
            width='16'
            height='10'
            viewBox='0 0 16 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.3125 7.8125C4.28906 8.44531 4.00781 8.9375 3.46875 9.28906C2.90625 9.57031 2.34375 9.57031 1.78125 9.28906C1.24219 8.9375 0.960938 8.44531 0.9375 7.8125C0.960938 7.17969 1.24219 6.6875 1.78125 6.33594C2.34375 6.05469 2.90625 6.05469 3.46875 6.33594C4.00781 6.6875 4.28906 7.17969 4.3125 7.8125ZM9.9375 7.8125C9.91406 8.44531 9.63281 8.9375 9.09375 9.28906C8.53125 9.57031 7.96875 9.57031 7.40625 9.28906C6.86719 8.9375 6.58594 8.44531 6.5625 7.8125C6.58594 7.17969 6.86719 6.6875 7.40625 6.33594C7.96875 6.05469 8.53125 6.05469 9.09375 6.33594C9.63281 6.6875 9.91406 7.17969 9.9375 7.8125ZM13.875 6.125C14.5078 6.14844 15 6.42969 15.3516 6.96875C15.6328 7.53125 15.6328 8.09375 15.3516 8.65625C15 9.19531 14.5078 9.47656 13.875 9.5C13.2422 9.47656 12.75 9.19531 12.3984 8.65625C12.1172 8.09375 12.1172 7.53125 12.3984 6.96875C12.75 6.42969 13.2422 6.14844 13.875 6.125ZM4.3125 2.1875C4.28906 2.82031 4.00781 3.3125 3.46875 3.66406C2.90625 3.94531 2.34375 3.94531 1.78125 3.66406C1.24219 3.3125 0.960938 2.82031 0.9375 2.1875C0.960938 1.55469 1.24219 1.0625 1.78125 0.710938C2.34375 0.429688 2.90625 0.429688 3.46875 0.710938C4.00781 1.0625 4.28906 1.55469 4.3125 2.1875ZM8.25 0.5C8.88281 0.523438 9.375 0.804688 9.72656 1.34375C10.0078 1.90625 10.0078 2.46875 9.72656 3.03125C9.375 3.57031 8.88281 3.85156 8.25 3.875C7.61719 3.85156 7.125 3.57031 6.77344 3.03125C6.49219 2.46875 6.49219 1.90625 6.77344 1.34375C7.125 0.804688 7.61719 0.523438 8.25 0.5ZM15.5625 2.1875C15.5391 2.82031 15.2578 3.3125 14.7188 3.66406C14.1562 3.94531 13.5938 3.94531 13.0312 3.66406C12.4922 3.3125 12.2109 2.82031 12.1875 2.1875C12.2109 1.55469 12.4922 1.0625 13.0313 0.710938C13.5938 0.429688 14.1563 0.429688 14.7188 0.710938C15.2578 1.0625 15.5391 1.55469 15.5625 2.1875Z'
              fill='#C2C2C2'
            />
          </svg>
          <IconFont
            style={{ fontSize: 20 }}
            iconName={getIconNameByBlockType(type)}
          />
          <Typography.Text style={{ flex: 1 }}>{title || block?.name}</Typography.Text>
        </div>
      </BlockAvatarWrapper>
    </div>
  );
}

function LayoutItem({ columns, title }: { columns: string[][]; title: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {/* <p
        onClick={() => setVisible(v => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>{!visible ? <IconCaretRight /> : <IconCaretUp />}</span>
        )}
      </p> */}
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map(col => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              height: hide ? 0 : undefined,
              overflow: 'hidden',
              marginBottom: hide ? 0 : 20,
            }}
          >
            <BlockAvatarWrapper
              type={AdvancedType.SECTION}
              payload={payload}
            >
              <div
                style={{
                  border: '1px solid #E2E2E2',
                  borderRadius: '8px',
                  width: '100%',
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <svg
                  width='16'
                  height='10'
                  viewBox='0 0 16 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.3125 7.8125C4.28906 8.44531 4.00781 8.9375 3.46875 9.28906C2.90625 9.57031 2.34375 9.57031 1.78125 9.28906C1.24219 8.9375 0.960938 8.44531 0.9375 7.8125C0.960938 7.17969 1.24219 6.6875 1.78125 6.33594C2.34375 6.05469 2.90625 6.05469 3.46875 6.33594C4.00781 6.6875 4.28906 7.17969 4.3125 7.8125ZM9.9375 7.8125C9.91406 8.44531 9.63281 8.9375 9.09375 9.28906C8.53125 9.57031 7.96875 9.57031 7.40625 9.28906C6.86719 8.9375 6.58594 8.44531 6.5625 7.8125C6.58594 7.17969 6.86719 6.6875 7.40625 6.33594C7.96875 6.05469 8.53125 6.05469 9.09375 6.33594C9.63281 6.6875 9.91406 7.17969 9.9375 7.8125ZM13.875 6.125C14.5078 6.14844 15 6.42969 15.3516 6.96875C15.6328 7.53125 15.6328 8.09375 15.3516 8.65625C15 9.19531 14.5078 9.47656 13.875 9.5C13.2422 9.47656 12.75 9.19531 12.3984 8.65625C12.1172 8.09375 12.1172 7.53125 12.3984 6.96875C12.75 6.42969 13.2422 6.14844 13.875 6.125ZM4.3125 2.1875C4.28906 2.82031 4.00781 3.3125 3.46875 3.66406C2.90625 3.94531 2.34375 3.94531 1.78125 3.66406C1.24219 3.3125 0.960938 2.82031 0.9375 2.1875C0.960938 1.55469 1.24219 1.0625 1.78125 0.710938C2.34375 0.429688 2.90625 0.429688 3.46875 0.710938C4.00781 1.0625 4.28906 1.55469 4.3125 2.1875ZM8.25 0.5C8.88281 0.523438 9.375 0.804688 9.72656 1.34375C10.0078 1.90625 10.0078 2.46875 9.72656 3.03125C9.375 3.57031 8.88281 3.85156 8.25 3.875C7.61719 3.85156 7.125 3.57031 6.77344 3.03125C6.49219 2.46875 6.49219 1.90625 6.77344 1.34375C7.125 0.804688 7.61719 0.523438 8.25 0.5ZM15.5625 2.1875C15.5391 2.82031 15.2578 3.3125 14.7188 3.66406C14.1562 3.94531 13.5938 3.94531 13.0312 3.66406C12.4922 3.3125 12.2109 2.82031 12.1875 2.1875C12.2109 1.55469 12.4922 1.0625 13.0313 0.710938C13.5938 0.429688 14.1563 0.429688 14.7188 0.710938C15.2578 1.0625 15.5391 1.55469 15.5625 2.1875Z'
                    fill='#C2C2C2'
                  />
                </svg>

                <div
                  style={{
                    height: 16,
                    // border: '1px solid rgb(85, 85, 85)',
                    borderRadius: 3,
                    display: 'flex',
                    flex: 1,
                    gap: '10px',
                  }}
                >
                  {item.map((column, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          border: '1px dashed #0075FF',
                          height: '100%',
                          background: '#0075FF1F',
                          width: column,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </BlockAvatarWrapper>
          </div>
        );
      })}
    </div>
  );
}
