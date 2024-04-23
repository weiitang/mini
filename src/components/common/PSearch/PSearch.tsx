/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Cell, Search } from '@taroify/core';
import Search_ from '@/components/icons/icons-container/Search';
import PHighlightItem from '../PHighlight/PHighlight';
import styles from './PSearch.module.less';


/** 搜索组件 */
const PSearch = (props: SearchProps) => {
  const { listData, setValue, setOpen, onSearch } = props;
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const val = e.detail.value;
    setKeyword(val);
    doSearch(val, true);
  };

  const onSearchHandler = () => {
    doSearch(keyword, false);
  };

  const doSearch = async (text: string, reset: boolean) => {
    if (!onSearch) {
      return;
    }

    try {
      setLoading(true);
      await onSearch(text, reset);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result: any = [];

    // onSearch存在时，不对结果数据过滤
    if (keyword && !onSearch) {
      result = listData ? listData.filter(_ => _.orgName.includes(keyword)) : [];
    } else {
      result = listData || [];
    }

    setData(result);
  }, [listData, keyword, onSearch]);

  return (
    <View className={styles['search-contain']}>
      <Search
        value={keyword}
        clearable
        cursor-spacing={100}
        className={styles.search}
        placeholder='请输入公司名称'
        icon={<Search_ name='search' size={16} className={styles.icon} />}
        onChange={e => onChangeHandler(e)}
      />
      <View
        className={styles['scroll-content']}
      >
        <ScrollView
          className={styles['list-container']}
          scrollY
          enhanced
          bounces
          scrollX={false}
          scrollAnchoring
          scrollWithAnimation
          lowerThreshold={60}
          onScrollToLower={onSearchHandler}
        >
          {
            data.length > 0
              ? <>
              {data.map((item, index) => (
              <Cell key={index} onClick={() => {
                const orgId = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.orgId;
                const postId = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.postId;
                const postName = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.postName;
                setValue({
                  orgName: item.orgName,
                  orgId,
                  postId,
                  postName,
                });
                setOpen(false);
              }}
              >
                <PHighlightItem
                  searchValue={keyword}
                  name={item.orgName}
                  onCLick={(e) => {
                    e?.stopPropagation();
                    const orgId = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.orgId;
                    const postId = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.postId;
                    const postName = listData?.filter(_ => _.orgName === item.orgName)?.[0]?.postName;
                    setValue({
                      orgName: item.orgName,
                      orgId,
                      postId,
                      postName,
                    });
                    setOpen(false);
                  }}
                />
              </Cell>
              ))}

              {onSearch && loading ? <View className={styles.nodata}>载入中...</View> : null}

              </> : onSearch ? <View className={styles.nodata}>{loading ? '载入中...' : '暂无数据'}</View> : null

          }
        </ScrollView>
      </View>
    </View>
  );
};

export default PSearch;
