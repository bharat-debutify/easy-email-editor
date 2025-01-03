import { classnames } from '@/utils/classnames';
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '../Button';
import { Stack } from '../Stack';
import './index.scss';

export interface TabsProps {
  children?: React.ReactNode;
  tabBarExtraContent?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (id: string) => void;
  onBeforeChange?: (current: string, next: string) => boolean;
  defaultActiveTab?: string;
  activeTab?: string;
  tabBarExtraContentRight?: React.ReactNode;
}
export interface TabPaneProps {
  children?: React.ReactNode;
  tab: React.ReactNode;
  key: string;
  style?: React.CSSProperties;
  className?: string;
}

const Tabs: React.FC<TabsProps> = props => {
  const [activeTab, setActiveTab] = useState<string>(props.defaultActiveTab || '');

  const onClick = useCallback(
    (nextTab: string) => {
      if (!props.onBeforeChange) {
        setActiveTab(nextTab);
        props.onChange?.(nextTab);
      }
      if (props.onBeforeChange) {
        const next = props.onBeforeChange(activeTab, nextTab);
        if (next) {
          setActiveTab(nextTab);
          props.onChange?.(nextTab);
        }
      }
    },
    [activeTab, props],
  );

  useEffect(() => {
    if (props.activeTab) {
      setActiveTab(props.activeTab);
    }
  }, [props.activeTab]);

  return (
    <div
      style={props.style}
      className={props.className}
    >
      <div className='easy-email-editor-tabWrapper'>
        <Stack
          distribution='equalSpacing'
          alignment='center'
        >
          {props.tabBarExtraContent}
          <Stack alignment='center'>
            {React.Children.map(
              props.children as any,
              (item: { props: { tab: TabPaneProps }; key: string }, index) => {
                return (
                  <Button
                    noBorder
                    onClick={() => onClick(item.key)}
                  >
                    <>{item.props.tab}</>
                  </Button>
                );
              },
            )}
          </Stack>
          {props.tabBarExtraContentRight}
        </Stack>
      </div>
      {React.Children.map(
        props.children as any,
        (item: { props: { tab: TabPaneProps }; key: string }, index) => {
          const visible = (!activeTab && index === 0) || item.key === activeTab;
          return (
            <div
              style={{
                display: visible ? undefined : 'none',
                height: 'calc(100% - 50px)',
              }}
            >
              <>{item}</>
            </div>
          );
        },
      )}
    </div>
  );
};

const TabPane: React.FC<TabPaneProps> = props => {
  return <>{props.children}</>;
};

export { Tabs, TabPane };
