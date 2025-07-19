import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from './VerticalCard';
import apiSummary from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll('category');

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiSummary.filterProduct.url, {
        method: apiSummary.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching products', error);
    }
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory).filter((key) => selectCategory[key]);
    setFilterCategoryList(selectedCategories);

    const urlParams = selectedCategories.map((cat) => `category=${cat}`).join('&');
    navigate('/product-category?' + urlParams);
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto p-4">
        <div className=" lg:grid grid-cols-[220px_1fr] gap-6">

          {/* Filter Sidebar */}
          <aside className="bg-base-100 rounded-2xl p-4 shadow-md h-[calc(100vh-130px)] overflow-y-auto">
            {/* Sort */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase border-b border-base-300 pb-2 text-base-content/80">
                Sort By
              </h3>
              <form className="mt-3 space-y-2 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="asc"
                    checked={sortBy === 'asc'}
                    onChange={handleOnChangeSortBy}
                    className="radio radio-primary"
                  />
                  <span>Price - Low to High</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sortBy"
                    value="dsc"
                    checked={sortBy === 'dsc'}
                    onChange={handleOnChangeSortBy}
                    className="radio radio-primary"
                  />
                  <span>Price - High to Low</span>
                </label>
              </form>
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="text-sm font-bold uppercase border-b border-base-300 pb-2 text-base-content/80">
                Category
              </h3>
              <form className="mt-3 space-y-2 text-sm">
                {productCategory.map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      value={cat?.value}
                      id={cat?.value}
                      checked={selectCategory[cat?.value] || false}
                      onChange={handleSelectCategory}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span>{cat?.label}</span>
                  </label>
                ))}
              </form>
            </div>
          </aside>

          {/* Product List Section */}
          <section className="space-y-4">
            <p className="text-lg font-semibold text-base-content">
              Search Results: {data.length}
            </p>

            <div className="overflow-y-auto max-h-[calc(100vh-130px)] pr-2">
              <VerticalCard data={data} loading={loading} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
