'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import FadeIn from './FadeIn'
import productData from '../data/products.json'

const { products, categories, tagLabels } = productData

const TAG_KEYS = Object.keys(tagLabels)

export default function ProductGrid({ showHeader = true }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTag, setActiveTag] = useState(null)

  const filtered = products.filter(p => {
    const categoryMatch = activeCategory === 'All' || p.category === activeCategory
    const tagMatch = !activeTag || (p.tags && p.tags.includes(activeTag))
    return categoryMatch && tagMatch
  })

  return (
    <section id="collection">
      {showHeader && (
        <div className="section-header">
          <FadeIn>
            <h2>The Collection</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p>Every product is tried, tested, and vetted for quality, materials, and origin.</p>
          </FadeIn>
        </div>
      )}

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="filter-bar filter-bar-tags">
        <button
          className={`filter-btn filter-btn-tag ${activeTag === null ? 'active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {TAG_KEYS.map(tag => (
          <button
            key={tag}
            className={`filter-btn filter-btn-tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tagLabels[tag]}
          </button>
        ))}
      </div>

      <div className="product-grid-wrap">
        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))
          ) : (
            <div className="filter-empty">
              No products match these filters.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
