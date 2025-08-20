import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Shield, AlertTriangle, DollarSign, Eye, Calendar, MapPin, User, FileText, BarChart3, PieChart, Activity, Upload, Camera, X, ArrowLeftRight, Mail } from 'lucide-react';

const EvaluationPage = ({ 
  searchQuery,
  setSearchQuery,
  selectedArtwork,
  setSelectedArtwork,
  evaluationData,
  setEvaluationData,
  loading,
  setLoading,
  uploadedImage,
  setUploadedImage,
  uploadMode,
  setUploadMode,
  dragOver,
  setDragOver,
  handleSearch,
  handleImageUpload,
  analyzeUploadedArtwork,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  generateEvaluationData,
  formatCurrency,
  getRiskColor,
  getTrendIcon,
  artDatabase,
  setCurrentPage
}) => (
    <div className="min-h-screen bg-white">
      <Header setCurrentPage={setCurrentPage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Art Evaluation</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {setUploadMode(false); setUploadedImage(null);}}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !uploadMode ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                }`}
              >
                Search Database
              </button>
              <button
                onClick={() => setUploadMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                }`}
              >
                Upload Image
              </button>
            </div>
          </div>

          {!uploadMode ? (
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter artwork title, artist name, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading || !searchQuery.trim()}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:from-red-700 hover:to-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{loading ? 'Analyzing...' : 'Evaluate'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {!uploadedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Artwork</h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop an image here, or click to select a file
                  </p>
                  <div className="flex justify-center space-x-4">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                        className="hidden"
                      />
                      <div className="px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:from-red-700 hover:to-blue-700 flex items-center space-x-2">
                        <Camera className="w-4 h-4" />
                        <span>Choose File</span>
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Supported formats: JPG, PNG, GIF (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Uploaded Image</h4>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <img
                      src={uploadedImage.url}
                      alt="Uploaded artwork"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{uploadedImage.name}</p>
                      <p className="text-sm text-gray-600">Ready for AI analysis</p>
                    </div>
                    <button
                      onClick={() => analyzeUploadedArtwork(uploadedImage.file, uploadedImage.url)}
                      disabled={loading}
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:from-red-700 hover:to-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Analyzing...' : 'Analyze Artwork'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <div className="text-lg text-gray-600">
                {uploadMode || uploadedImage ? 
                  'AI is analyzing your uploaded artwork for pricing, authenticity, and investment potential...' :
                  'AI is analyzing artwork data, market trends, and authenticity factors...'
                }
              </div>
            </div>
          </div>
        )}

        {selectedArtwork && evaluationData && (
          <div className="space-y-8">
            {/* Artwork Overview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={selectedArtwork.id === 'uploaded' ? uploadedImage?.url : selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedArtwork.title}</h3>
                      <p className="text-lg text-gray-600 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedArtwork.artist}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(selectedArtwork.marketTrend)}
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {selectedArtwork.marketTrend}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-semibold">{selectedArtwork.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Medium</p>
                      <p className="font-semibold">{selectedArtwork.medium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dimensions</p>
                      <p className="font-semibold">{selectedArtwork.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {selectedArtwork.currentLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Current Estimated Value</p>
                      <p className="text-3xl font-bold text-green-600">
                        {formatCurrency(selectedArtwork.estimatedValue)}
                      </p>
                      {selectedArtwork.id === 'uploaded' && (
                        <p className="text-xs text-amber-600 mt-1">
                          *Based on AI image analysis - physical appraisal recommended
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last Sale Price</p>
                      <p className="text-lg font-semibold text-gray-700">
                        {selectedArtwork.lastSalePrice ? formatCurrency(selectedArtwork.lastSalePrice) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evaluation Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Price Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Price Analysis</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Confidence Interval</p>
                    <p className="font-semibold">
                      {formatCurrency(evaluationData.priceAnalysis.confidenceInterval[0])} - {formatCurrency(evaluationData.priceAnalysis.confidenceInterval[1])}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Market Factors</p>
                    <div className="space-y-2">
                      {evaluationData.priceAnalysis.marketFactors.map((factor, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{factor.factor}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              factor.impact.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {factor.impact}
                            </span>
                            <span className="text-gray-500">{factor.weight}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Authenticity & Risk */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Authenticity & Risk</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Authenticity Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedArtwork.authenticity.score}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold">{selectedArtwork.authenticity.score}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Risk Assessment</p>
                    <div className="space-y-2">
                      {evaluationData.riskAssessment.factors.map((risk, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{risk.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.risk)}`}>
                            {risk.risk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Investment Metrics</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">ROI Score</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                        {selectedArtwork.roi.score}/10
                      </span>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${selectedArtwork.roi.score * 10}%`,
                              background: 'linear-gradient(to right, #dc2626, #2563eb)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Annual Return</p>
                      <p className="font-semibold text-green-600">+{selectedArtwork.roi.annualizedReturn}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Liquidity</p>
                      <p className="font-semibold">{evaluationData.investmentMetrics.liquidityScore}/10</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Time Horizon</p>
                    <p className="font-semibold">{evaluationData.investmentMetrics.timeHorizon}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row of Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Comparable Sales */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Comparable Sales</h3>
                </div>
                
                <div className="space-y-3">
                  {evaluationData.comparableSales && evaluationData.comparableSales.recentSales.map((sale, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium text-gray-800">{sale.title}</p>
                      <div className="flex justify-between items-center text-gray-600">
                        <span>{sale.price}</span>
                        <span>{sale.date}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">
                      Average appreciation: <span className="text-green-600">+{evaluationData.comparableSales?.avgAppreciation || '15'}% annually</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Liquidity Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Liquidity Analysis</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Liquidity Score</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {evaluationData.investmentMetrics.liquidityScore}/10
                      </span>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${evaluationData.investmentMetrics.liquidityScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average sale time</span>
                      <span className="font-medium">{evaluationData.liquidityAnalysis?.avgSaleTime || '3-6 months'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active buyers</span>
                      <span className="font-medium">{evaluationData.liquidityAnalysis?.activeBuyers || '25'} collectors</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auction frequency</span>
                      <span className="font-medium">{evaluationData.liquidityAnalysis?.auctionFrequency || 'Quarterly'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance & Storage */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Insurance & Storage</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual insurance</span>
                      <span className="font-medium">{formatCurrency(selectedArtwork.estimatedValue * 0.003)} <span className="text-gray-500">(0.3%)</span></span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Climate storage</span>
                      <span className="font-medium">{formatCurrency(evaluationData.insuranceStorage?.climateStorage || 48000)}/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Security system</span>
                      <span className="font-medium">{formatCurrency(evaluationData.insuranceStorage?.security || 12000)}/year</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-700">Total annual cost</span>
                      <span className="font-bold text-red-600">
                        {formatCurrency(
                          (selectedArtwork.estimatedValue * 0.003) + 
                          (evaluationData.insuranceStorage?.climateStorage || 48000) + 
                          (evaluationData.insuranceStorage?.security || 12000)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Row - Collector Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Collector Profile</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    {evaluationData.collectorProfile && evaluationData.collectorProfile.demographics.map((demo, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{demo.category}</span>
                        <span className="font-medium">{demo.percentage}%</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Primary age group</p>
                    <p className="font-medium">{evaluationData.collectorProfile?.ageGroup || '35-50 years'} ({evaluationData.collectorProfile?.agePercentage || '68'}%)</p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Geographic distribution</p>
                    <p className="text-sm font-medium">{evaluationData.collectorProfile?.regions || 'NYC 45%, LA 22%, London 18%'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Report */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">AI Evaluation Report</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Market Analysis</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Based on recent market trends and comparable sales, this artwork shows strong investment potential. The artist's market has appreciated consistently over the past decade.</p>
                    <p>Recent auction results for similar works by {selectedArtwork.artist} indicate sustained collector interest and institutional backing.</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Risk Factors</h4>
                  <div className="space-y-2">
                    {selectedArtwork.authenticity.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {factor.includes('verified') || factor.includes('confirmed') ? 
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div> :
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        }
                        <span className="text-gray-600">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      {selectedArtwork.id === 'uploaded' ? 'AI Analysis Recommendation' : 'Investment Recommendation'}
                    </h5>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedArtwork.id === 'uploaded' ? 
                        'This analysis is based on visual AI assessment. For accurate valuation and authentication, consult a certified art appraiser and conduct physical examination.' :
                        `${selectedArtwork.roi.projection}. Consider this artwork for portfolio diversification with a medium to long-term investment horizon.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedArtwork && !loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Evaluate Art</h3>
            <p className="text-gray-600 mb-4">
              Search our database or upload your own artwork image for comprehensive AI-powered evaluation.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Pricing Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Authenticity Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Investment Metrics</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

// Updated Header Component with active buttons
const Header = ({ setCurrentPage }) => (
  <header className="px-6 py-6 bg-white border-b border-gray-200 relative z-20">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 border-2 rounded-lg relative" style={{ borderColor: '#000000', background: 'transparent' }}>
          {/* Inner diamond in black and white */}
          <div 
            className="absolute inset-0"
            style={{
              transform: 'rotate(45deg) scale(0.7)',
              top: '50%',
              left: '50%',
              transformOrigin: 'center',
              marginTop: '-50%',
              marginLeft: '-50%',
              width: '100%',
              height: '100%',
              background: '#000000',
              border: '1px solid #000000'
            }}
          >
            {/* Mini square inside diamond in white */}
            <div 
              className="absolute inset-0 border-2 border-white"
              style={{
                transform: 'rotate(45deg) scale(0.85)',
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                marginTop: '-50%',
                marginLeft: '-50%',
                width: '100%',
                height: '100%'
              }}
            ></div>
          </div>

          {/* Plus symbol in white */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {/* Horizontal line of plus */}
            <div 
              className="absolute bg-white"
              style={{
                width: '100%',
                height: '2px',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)'
              }}
            ></div>
            {/* Vertical line of plus */}
            <div 
              className="absolute bg-white"
              style={{
                width: '2px',
                height: '100%',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            ></div>
          </div>
        </div>
        <span 
          className="text-xl font-semibold text-black cursor-pointer" 
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
          onClick={() => setCurrentPage('landing')}
        >
          Vasari
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setCurrentPage('try-vasari')}
          className="px-4 bg-white text-black text-xs font-bold rounded-lg shadow-lg border border-black flex items-center hover:bg-gray-100 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace', height: '53px' }}
        >
          <span>TRY VASARI</span>
        </button>
        <button
          onClick={() => setCurrentPage('evaluation')}
          className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg shadow-lg border border-black flex items-center hover:bg-gray-800 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace', height: '53px' }}
        >
          <Eye className="w-3 h-3 mr-1" />
          <span>EVALUATE ARTWORK</span>
        </button>
        <button
          onClick={() => setCurrentPage('portfolio')}
          className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg shadow-lg border border-black flex items-center hover:bg-gray-800 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace', height: '53px' }}
        >
          <BarChart3 className="w-3 h-3 mr-1" />
          <span>MY PORTFOLIO</span>
        </button>
      </div>
    </div>
  </header>
);

// Intersection Observer Hook
  const useIntersectionObserver = (threshold = 0.3) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [threshold]);

    return [ref, isVisible];
  };

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'falling': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

// Landing Page Component
  const LandingPage = ({ setCurrentPage }) => {
    const [heroRef, heroVisible] = useIntersectionObserver(0.3);
    const [featuresRef, featuresVisible] = useIntersectionObserver(0.3);
    const [problemRef, problemVisible] = useIntersectionObserver(0.3);
    const [solutionRef, solutionVisible] = useIntersectionObserver(0.3);
    const [foundersRef, foundersVisible] = useIntersectionObserver(0.3);
    
    return (
      <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Header setCurrentPage={setCurrentPage} />

        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative pt-0" style={{ transform: 'translateY(-8rem)', zIndex: 1 }}>
          <div className="relative flex flex-col items-center justify-center">
            {/* All the balls and stars animations stays the same */}
            <svg width="1400" height="1200" className="absolute" style={{ zIndex: -10 }}>
              <defs>
                <linearGradient id="ballGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="ballGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="ballGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="ballGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="50%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
                <linearGradient id="ballGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="50%" stopColor="#6d28d9" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="ballGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="ballGradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="ballGradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#991b1b" />
                  <stop offset="50%" stopColor="#581c87" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="ballGradient9" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="50%" stopColor="#be185d" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="ballGradient10" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#a21caf" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="ballGradient11" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c2410c" />
                  <stop offset="50%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="ballGradient12" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="50%" stopColor="#4c1d95" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="ballGradient13" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#7e22ce" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="ballGradient14" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="ballGradient15" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="ballGradient16" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="ballGradient17" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#1f2937" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="ballGradient18" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c2d12" />
                  <stop offset="50%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="ballGradient19" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="ballGradient20" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="50%" stopColor="#c026d3" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="ballGradient21" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="ballGradient22" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="ballGradient23" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="50%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="ballGradient24" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#84cc16" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="ballGradient25" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="ballGradient26" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="ballGradient27" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="ballGradient28" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="ballGradient29" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#6d28d9" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="squareGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="squareGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="squareGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="squareGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="50%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
                <linearGradient id="squareGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="squareGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <linearGradient id="squareGradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="squareGradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="squareGradient9" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="squareGradient10" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="vasariSquareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              
              {/* Define a clipping mask to exclude the center area */}
              <defs>
                <mask id="centerMask">
                  <rect x="0" y="0" width="1400" height="1200" fill="white" />
                  {/* Cut out center area where title is - approximate position */}
                  <rect x="500" y="400" width="400" height="400" fill="black" />
                </mask>
              </defs>
              
              {/* Apply mask to a group containing all animated elements */}
              <g mask="url(#centerMask)">
              
              {/* Ball 1 - Top edge (clockwise, faster) - STAR */}
              <path 
                d="M 700,20 L 703,28 L 711,26 L 703,34 L 700,42 L 697,34 L 689,26 L 697,28 Z" 
                fill="url(#ballGradient1)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2s linear infinite'
                }}
              />
              
              {/* Ball 2 - Right edge (clockwise, faster) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="600" 
                r="7" 
                fill="url(#ballGradient2)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3s linear infinite'
                }}
              />
              
              {/* Ball 3 - Bottom edge (counter-clockwise, faster) - STAR */}
              <path 
                d="M 700,1112 L 703,1120 L 711,1118 L 703,1126 L 700,1134 L 697,1126 L 689,1118 L 697,1120 Z" 
                fill="url(#ballGradient3)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.5s linear infinite'
                }}
              />
              
              {/* Ball 4 - Left edge (clockwise, faster) - CIRCLE */}
              <circle 
                cx="80" 
                cy="600" 
                r="7" 
                fill="url(#ballGradient4)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.75s linear infinite'
                }}
              />
              
              {/* Ball 5 - Top-right corner (counter-clockwise, faster) - STAR */}
              <path 
                d="M 1120,20 L 1123,28 L 1131,26 L 1123,34 L 1120,42 L 1117,34 L 1109,26 L 1117,28 Z" 
                fill="url(#ballGradient5)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.25s linear infinite'
                }}
              />
              
              {/* Ball 6 - Bottom-left corner (clockwise, faster) - CIRCLE */}
              <circle 
                cx="80" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient6)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.75s linear infinite'
                }}
              />
              
              {/* Ball 7 - Top-left corner (clockwise, faster) - STAR */}
              <path 
                d="M 80,20 L 83,28 L 91,26 L 83,34 L 80,42 L 77,34 L 69,26 L 77,28 Z" 
                fill="url(#ballGradient7)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.75s linear infinite'
                }}
              />
              
              {/* Ball 8 - Mid-top edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="420" 
                cy="20" 
                r="7" 
                fill="url(#ballGradient8)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.4s linear infinite'
                }}
              />
              
              {/* Ball 9 - Mid-right edge (clockwise) - STAR */}
              <path 
                d="M 1120,450 L 1123,458 L 1131,456 L 1123,464 L 1120,472 L 1117,464 L 1109,456 L 1117,458 Z" 
                fill="url(#ballGradient9)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.1s linear infinite'
                }}
              />
              
              {/* Ball 10 - Mid-bottom edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="840" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient10)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.6s linear infinite'
                }}
              />
              
              {/* Ball 11 - Mid-left edge (clockwise) - STAR */}
              <path 
                d="M 76,880 L 83,882 L 81,890 L 89,882 L 96,880 L 89,878 L 81,870 L 83,878 Z" 
                fill="url(#ballGradient11)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.9s linear infinite'
                }}
              />
              
              {/* Ball 12 - Bottom-right corner (counter-clockwise) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient12)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 3.25s linear infinite'
                }}
              />
              
              {/* Ball 13 - Quarter-top edge (clockwise) - STAR */}
              <path 
                d="M 290,20 L 293,28 L 301,26 L 293,34 L 290,42 L 287,34 L 279,26 L 287,28 Z" 
                fill="url(#ballGradient13)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.8s linear infinite'
                }}
              />
              
              {/* Ball 14 - Three-quarter-top edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="770" 
                cy="20" 
                r="7" 
                fill="url(#ballGradient14)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.3s linear infinite'
                }}
              />
              
              {/* Ball 15 - Quarter-right edge (clockwise) - STAR */}
              <path 
                d="M 1120,300 L 1123,308 L 1131,306 L 1123,314 L 1120,322 L 1117,314 L 1109,306 L 1117,308 Z" 
                fill="url(#ballGradient15)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.1s linear infinite'
                }}
              />
              
              {/* Ball 16 - Three-quarter-bottom edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="500" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient16)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.6s linear infinite'
                }}
              />
              
              {/* Ball 17 - Quarter-left edge (clockwise) - STAR */}
              <path 
                d="M 76,950 L 83,952 L 81,960 L 89,952 L 96,950 L 89,948 L 81,940 L 83,948 Z" 
                fill="url(#ballGradient17)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.9s linear infinite'
                }}
              />
              
              {/* Ball 18 - Upper-quarter-top edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="345" 
                cy="20" 
                r="7" 
                fill="url(#ballGradient18)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.7s linear infinite'
                }}
              />
              
              {/* Ball 19 - Upper-quarter-right edge (clockwise) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="350" 
                r="7" 
                fill="url(#ballGradient19)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.4s linear infinite'
                }}
              />
              
              {/* Ball 20 - Lower-quarter-bottom edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="680" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient20)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.3s linear infinite'
                }}
              />
              
              {/* Ball 21 - Lower-quarter-left edge (clockwise) - CIRCLE */}
              <circle 
                cx="80" 
                cy="750" 
                r="7" 
                fill="url(#ballGradient21)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.4s linear infinite'
                }}
              />
              
              {/* Ball 22 - Three-quarter-right edge (counter-clockwise) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="850" 
                r="7" 
                fill="url(#ballGradient22)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 3.8s linear infinite'
                }}
              />
              
              {/* Ball 23 - One-eighth-bottom edge (clockwise) - CIRCLE */}
              <circle 
                cx="430" 
                cy="1120" 
                r="7" 
                fill="url(#ballGradient23)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.7s linear infinite'
                }}
              />
              
              {/* Ball 24 - Seven-eighth-top edge (counter-clockwise) - STAR */}
              <path 
                d="M 950,20 L 953,28 L 961,26 L 953,34 L 950,42 L 947,34 L 939,26 L 947,28 Z" 
                fill="url(#ballGradient24)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.8s linear infinite'
                }}
              />
              
              {/* Ball 25 - Five-eighth-right edge (clockwise) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="720" 
                r="7" 
                fill="url(#ballGradient25)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.6s linear infinite'
                }}
              />
              
              {/* Ball 26 - Three-eighth-bottom edge (counter-clockwise) - STAR */}
              <path 
                d="M 550,1116 L 553,1124 L 561,1122 L 553,1130 L 550,1138 L 547,1130 L 539,1122 L 547,1124 Z" 
                fill="url(#ballGradient26)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.2s linear infinite'
                }}
              />
              
              {/* Ball 27 - Seven-eighth-left edge (clockwise) - CIRCLE */}
              <circle 
                cx="80" 
                cy="520" 
                r="7" 
                fill="url(#ballGradient27)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.2s linear infinite'
                }}
              />
              
              {/* Ball 28 - One-eighth-top edge (counter-clockwise) - STAR */}
              <path 
                d="M 215,20 L 218,28 L 226,26 L 218,34 L 215,42 L 212,34 L 204,26 L 212,28 Z" 
                fill="url(#ballGradient28)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 3.2s linear infinite'
                }}
              />
              
              {/* Ball 29 - Seven-eighth-right edge (clockwise) - CIRCLE */}
              <circle 
                cx="1120" 
                cy="800" 
                r="7" 
                fill="url(#ballGradient29)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.95s linear infinite'
                }}
              />
              
              {/* Square 1 - Upper-left quadrant (counter-clockwise) */}
              <rect 
                x="380" 
                y="180" 
                width="10" 
                height="10" 
                fill="url(#squareGradient1)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.4s linear infinite'
                }}
              />
              
              {/* Square 2 - Upper-right quadrant (clockwise) */}
              <rect 
                x="920" 
                y="160" 
                width="10" 
                height="10" 
                fill="url(#squareGradient2)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.7s linear infinite'
                }}
              />
              
              {/* Square 3 - Lower-left quadrant (clockwise) */}
              <rect 
                x="240" 
                y="980" 
                width="10" 
                height="10" 
                fill="url(#squareGradient3)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.6s linear infinite'
                }}
              />
              
              {/* Square 4 - Lower-right quadrant (counter-clockwise) */}
              <rect 
                x="860" 
                y="950" 
                width="10" 
                height="10" 
                fill="url(#squareGradient4)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.9s linear infinite'
                }}
              />
              
              {/* Square 5 - Top edge center (clockwise) */}
              <rect 
                x="580" 
                y="40" 
                width="10" 
                height="10" 
                fill="url(#squareGradient5)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 2.1s linear infinite'
                }}
              />
              
              {/* Square 6 - Right edge center (counter-clockwise) */}
              <rect 
                x="1100" 
                y="480" 
                width="10" 
                height="10" 
                fill="url(#squareGradient6)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 3.3s linear infinite'
                }}
              />
              
              {/* Square 7 - Bottom edge offset (clockwise) */}
              <rect 
                x="620" 
                y="1100" 
                width="10" 
                height="10" 
                fill="url(#squareGradient7)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 1.8s linear infinite'
                }}
              />
              
              {/* Square 8 - Left edge offset (counter-clockwise) */}
              <rect 
                x="100" 
                y="320" 
                width="10" 
                height="10" 
                fill="url(#squareGradient8)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 2.7s linear infinite'
                }}
              />
              
              {/* Square 9 - Mid-diagonal position (clockwise) */}
              <rect 
                x="650" 
                y="280" 
                width="10" 
                height="10" 
                fill="url(#squareGradient9)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitClockwise 3.1s linear infinite'
                }}
              />
              
              {/* Square 10 - Opposite diagonal (counter-clockwise) */}
              <rect 
                x="320" 
                y="780" 
                width="10" 
                height="10" 
                fill="url(#squareGradient10)"
                opacity="0.8"
                style={{ 
                  animation: 'squareOrbitCounterClockwise 1.4s linear infinite'
                }}
              />
              </g>
            </svg>
            
            {/* Text content in vertical stack */}
            <div className="text-center relative z-10">
              {/* Idle Square above Vasari */}
              <div className="flex justify-center mb-2">
                <div className="flex flex-col items-center">
                  {/* Square with gradient border */}
                  <div 
                    className="w-16 h-16 border-8 rounded-lg relative"
                    style={{
                      borderImage: 'linear-gradient(90deg, #dc2626, #2563eb, #dc2626) 1',
                      background: 'transparent'
                    }}
                  >
                    {/* Inner diamond wireframe */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        transform: 'rotate(45deg) scale(0.7)',
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'center',
                        marginTop: '-50%',
                        marginLeft: '-50%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #dc2626, #2563eb)',
                        border: '1px solid black'
                      }}
                    >
                      {/* Mini square inside diamond */}
                      <div 
                        className="absolute inset-0 border-4 border-white"
                        style={{
                          transform: 'rotate(45deg) scale(0.85)',
                          top: '50%',
                          left: '50%',
                          transformOrigin: 'center',
                          marginTop: '-50%',
                          marginLeft: '-50%',
                          width: '100%',
                          height: '100%'
                        }}
                      ></div>
                    </div>

                    {/* Wireframe plus symbol in center - positioned above diamond */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      {/* Horizontal line of plus */}
                      <div 
                        className="absolute bg-white"
                        style={{
                          width: '100%',
                          height: '2px',
                          top: '50%',
                          left: '0',
                          transform: 'translateY(-50%)'
                        }}
                      ></div>
                      {/* Vertical line of plus */}
                      <div 
                        className="absolute bg-white"
                        style={{
                          width: '2px',
                          height: '100%',
                          top: '0',
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vasari Title */}
              <h1 
                className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-600 to-red-600 tracking-tight"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  backgroundSize: '200% 100%',
                  animation: 'shine 3s ease-in-out infinite',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(220, 38, 127, 0.3)'
                }}
              >
                Vasari
              </h1>
              
              {/* Subtitle */}
              <p 
                className="text-lg text-black opacity-40 mt-4"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                The AI-native platform revolutionizing<br />
                blue chip art market efficiency.
              </p>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes shine {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            
            @keyframes shimmer {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            @keyframes squareOrbitClockwise {
              0% { transform: translate(0, 0); }
              12.5% { transform: translate(250px, 0); }
              25% { transform: translate(520px, 0); }
              37.5% { transform: translate(520px, 250px); }
              50% { transform: translate(520px, 620px); }
              62.5% { transform: translate(250px, 620px); }
              75% { transform: translate(0, 620px); }
              87.5% { transform: translate(0, 250px); }
              100% { transform: translate(0, 0); }
            }
            
            @keyframes squareOrbitCounterClockwise {
              0% { transform: translate(0, 0); }
              12.5% { transform: translate(0, 250px); }
              25% { transform: translate(0, 620px); }
              37.5% { transform: translate(-250px, 620px); }
              50% { transform: translate(-520px, 620px); }
              62.5% { transform: translate(-520px, 250px); }
              75% { transform: translate(-520px, 0); }
              87.5% { transform: translate(-250px, 0); }
              100% { transform: translate(0, 0); }
            }
          `}</style>
        </section>

        {/* AI System Introduction */}
        <section className="py-32 px-6 bg-gray-50 relative" style={{ zIndex: 20 }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-4">Introducing</p>
            <h2 className="text-5xl font-black text-gray-900 mb-16" style={{ fontFamily: 'JetBrains Mono, monospace' }}>VASARI-AI</h2>
            
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed mb-16">
              <p>
                Vasari is building the digital infrastructure the art world has long needed. Much like Zillow transformed real estate, Vasari delivers <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">real-time valuations</span>, liquidity assessments, and ROI forecasts for <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">blue-chip artworks</span>.
              </p>
            </div>

            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                We go beyond appraisals—we power <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">full portfolio management</span> and enable AI-agentic transactions, allowing collectors, galleries, and investors to navigate the art market with speed, transparency, and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-32 px-6 bg-white relative" style={{ zIndex: 20 }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-8">Our vision</p>
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed mb-16">
              <p>
                The art market is a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">$1.7 trillion</span> asset class operating with legacy <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">inefficiencies</span>. Sales take months, pricing is opaque, and capital stays locked in illiquid works.
              </p>
              <p>
                We believe art should be managed like any other financial asset—<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">transparent and data-driven</span>. It's time the most creative asset class got <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">smarter infrastructure</span>.
              </p>
            </div>
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">We chose</span> the blue-chip art market because it's ripe for disruption. Unlike emerging or purely cultural art sectors, blue-chip art has consistent transaction data and market dynamics, making it <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">ideal for algorithmic modeling</span>. Yet the market still runs on manual pricing, private deals, and opaque broker margins. The result: slow sales, fragmented portfolios, and massive opportunity costs for investors. <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Vasari is here to fix that</span> with speed, intelligence, and scale.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-32 px-6 bg-gray-50 relative" style={{ zIndex: 20 }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 8s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <DollarSign className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Valuation Engine</h3>
                <p className="text-lg text-white text-opacity-90">Instant, algorithmic appraisals of artworks based on historical sales, artist trajectories, and comparable analysis.</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 10s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Portfolio Dashboard</h3>
                <p className="text-lg text-white text-opacity-90">Manage your collection with estimated ROI, liquidity scores, risk reports, and value trends.</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 11s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Market Intelligence</h3>
                <p className="text-lg text-white text-opacity-90">Receive optimized listing timelines, sale venue recommendations, and seasonality insights to maximize returns.</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 9s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <ArrowLeftRight className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Agentic Transactions (Coming Soon)</h3>
                <p className="text-lg text-white text-opacity-90">AI agents negotiate and execute buy/sell transactions directly—cutting sale cycles from months to days.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Separator Line before Founders */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-gray-300"></div>
          </div>
        </div>

        {/* Founders Section */}
        <section ref={foundersRef} className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-gray-900 mb-6">Meet the Founders</h3>
              <p className="text-xl text-gray-700">The team building the future of art market intelligence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-red-600">
                  Helen<br />Qin
                </h3>
                <p className="text-blue-600 font-medium">Co-Founder & CEO</p>
                <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <Mail className="w-3 h-3 mr-1" />
                  helen@getvasari.com
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                  Noah<br />Cha
                </h3>
                <p className="text-red-600 font-medium">Co-Founder & CTO</p>
                <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <Mail className="w-3 h-3 mr-1" />
                  noah@getvasari.com
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-blue-600">
                  Samarth<br />Dubey
                </h3>
                <p className="text-gray-800 font-medium">Co-Founder & CFO</p>
                <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <Mail className="w-3 h-3 mr-1" />
                  samarth@getvasari.com
                </p>
              </div>
              
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-500 mb-6 font-semibold tracking-wide uppercase">
              Trusted by leading art institutions
            </p>
            <p className="text-gray-600 text-lg">
              © 2025 Vasari. Revolutionizing art market intelligence through AI.
            </p>
          </div>
        </footer>
      </div>
    );
  };

// Try Vasari Page Component
  const TryVasariPage = ({ setCurrentPage }) => (
    <div className="min-h-screen bg-white">
     <Header setCurrentPage={setCurrentPage} />
      <div className="p-4" style={{ height: 'calc(100vh - 88px)' }}>
        <style>
          {`
            @keyframes contactShine {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}
        </style>
        <h1 
          className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-600 to-red-600" 
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            backgroundSize: '200% 100%',
            animation: 'contactShine 3s ease-in-out infinite',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          Contact us
        </h1>
        <p className="mt-8 text-2xl text-gray-700" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Email founders@getvasari.com for waitlist inquiries
        </p>
        <p className="mt-4 text-2xl text-gray-700" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          or
        </p>
        <a 
          href="https://cal.com/noahcha/try-vasari" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-black text-white text-xl font-bold rounded-lg hover:bg-gray-800 transition-colors"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Book a call
        </a>
        <div className="mt-16 w-11/12 mx-auto border-t border-gray-300"></div>
      </div>
    </div>
  );

// My Portfolio Page Component
  const PortfolioPage = ({ setCurrentPage, formatCurrency }) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
    const [portfolioView, setPortfolioView] = useState('grid');
    const [showTableView, setShowTableView] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
      contemporary: true,
      surrealist: true,
      modern: true
    });
    
    // Mock portfolio data with actual artwork images
    const portfolioData = {
      totalValue: 298000000,
      totalChange: 68000000,
      changePercent: 29.6,
      dayChange: 1850000,
      dayChangePercent: 0.62,
      yearChange: 68000000,
      yearChangePercent: 29.6,
      artworks: [
        {
          id: 1,
          title: "Untitled",
          artist: "Jean-Michel Basquiat",
          year: 1982,
          imageUrl: "/images/artworks/Basquiat.jpeg",
          purchasePrice: 85000000,
          currentValue: 110500000,
          change: 25500000,
          changePercent: 30.0,
          status: "Hold",
          riskLevel: "Low"
        },
        {
          id: 2,
          title: "The Empire of Light",
          artist: "René Magritte",
          year: 1954,
          imageUrl: "/images/artworks/Magritte.png",
          purchasePrice: 95000000,
          currentValue: 121000000,
          change: 26000000,
          changePercent: 27.4,
          status: "Hold",
          riskLevel: "Low"
        },
        {
          id: 3,
          title: "Broadway Boogie-Woogie",
          artist: "Piet Mondrian",
          year: 1943,
          imageUrl: "/images/artworks/Mondrian.jpeg",
          purchasePrice: 38000000,
          currentValue: 52000000,
          change: 14000000,
          changePercent: 36.8,
          status: "Buy",
          riskLevel: "Medium"
        },
        {
          id: 4,
          title: "La Femme",
          artist: "Pablo Picasso",
          year: 1953,
          imageUrl: "/images/artworks/Picasso.webp",
          purchasePrice: 12000000,
          currentValue: 14500000,
          change: 2500000,
          changePercent: 20.8,
          status: "Hold",
          riskLevel: "Low"
        }
      ],
      chartData: {
        '1M': [
          { date: 'May 10', value: 285000000 },
          { date: 'May 12', value: 286500000 },
          { date: 'May 14', value: 288000000 },
          { date: 'May 16', value: 287500000 },
          { date: 'May 18', value: 289000000 },
          { date: 'May 20', value: 290500000 },
          { date: 'May 22', value: 292000000 },
          { date: 'May 24', value: 291500000 },
          { date: 'May 26', value: 293000000 },
          { date: 'May 28', value: 294500000 },
          { date: 'May 30', value: 295000000 },
          { date: 'Jun 01', value: 296000000 },
          { date: 'Jun 03', value: 295500000 },
          { date: 'Jun 05', value: 296500000 },
          { date: 'Jun 07', value: 297000000 },
          { date: 'Jun 09', value: 298000000 }
        ],
        '3M': [
          { date: 'Mar 09', value: 265000000 },
          { date: 'Mar 16', value: 267000000 },
          { date: 'Mar 23', value: 268500000 },
          { date: 'Mar 30', value: 270000000 },
          { date: 'Apr 06', value: 271500000 },
          { date: 'Apr 13', value: 273000000 },
          { date: 'Apr 20', value: 274500000 },
          { date: 'Apr 27', value: 276000000 },
          { date: 'May 04', value: 277500000 },
          { date: 'May 11', value: 279000000 },
          { date: 'May 18', value: 280500000 },
          { date: 'May 25', value: 283000000 },
          { date: 'Jun 01', value: 285500000 },
          { date: 'Jun 09', value: 287500000 }
        ],
        '6M': [
          { date: 'Dec 09', value: 245000000 },
          { date: 'Dec 23', value: 248000000 },
          { date: 'Jan 06', value: 252000000 },
          { date: 'Jan 20', value: 255000000 },
          { date: 'Feb 03', value: 258000000 },
          { date: 'Feb 17', value: 261000000 },
          { date: 'Mar 03', value: 264000000 },
          { date: 'Mar 17', value: 268000000 },
          { date: 'Mar 31', value: 271000000 },
          { date: 'Apr 14', value: 274000000 },
          { date: 'Apr 28', value: 277000000 },
          { date: 'May 12', value: 280000000 },
          { date: 'May 26', value: 284000000 },
          { date: 'Jun 09', value: 287500000 }
        ],
        'YTD': [
          { date: 'Jan 01', value: 255000000 },
          { date: 'Jan 15', value: 257000000 },
          { date: 'Jan 31', value: 260000000 },
          { date: 'Feb 14', value: 263000000 },
          { date: 'Feb 28', value: 265000000 },
          { date: 'Mar 15', value: 268000000 },
          { date: 'Mar 31', value: 271000000 },
          { date: 'Apr 15', value: 274000000 },
          { date: 'Apr 30', value: 277000000 },
          { date: 'May 15', value: 281000000 },
          { date: 'May 31', value: 285000000 },
          { date: 'Jun 09', value: 287500000 }
        ],
        '1Y': [
          { date: 'Jul \'24', value: 230000000 },
          { date: 'Aug \'24', value: 238000000 },
          { date: 'Sep \'24', value: 245000000 },
          { date: 'Oct \'24', value: 252000000 },
          { date: 'Nov \'24', value: 260000000 },
          { date: 'Dec \'24', value: 268000000 },
          { date: 'Jan \'25', value: 275000000 },
          { date: 'Feb \'25', value: 282000000 },
          { date: 'Mar \'25', value: 288000000 },
          { date: 'Apr \'25', value: 293000000 },
          { date: 'May \'25', value: 296000000 },
          { date: 'Jun \'25', value: 298000000 }
        ],
        '2Y': [
          { date: 'Jun \'23', value: 220000000 },
          { date: 'Sep \'23', value: 228000000 },
          { date: 'Dec \'23', value: 235000000 },
          { date: 'Mar \'24', value: 242000000 },
          { date: 'Jun \'24', value: 250000000 },
          { date: 'Sep \'24', value: 260000000 },
          { date: 'Dec \'24', value: 268000000 },
          { date: 'Mar \'25', value: 277000000 },
          { date: 'Jun \'25', value: 287500000 }
        ]
      },
      performanceData: {
        '1M': [
          { date: 'Week 1', value: 275000000 },
          { date: 'Week 2', value: 278000000 },
          { date: 'Week 3', value: 282000000 },
          { date: 'Week 4', value: 287500000 }
        ],
        '3M': [
          { date: 'Month 1', value: 265000000 },
          { date: 'Month 2', value: 275000000 },
          { date: 'Month 3', value: 287500000 }
        ],
        '1Y': [
          { date: 'Q1', value: 255000000 },
          { date: 'Q2', value: 265000000 },
          { date: 'Q3', value: 275000000 },
          { date: 'Q4', value: 287500000 }
        ]
      },
      diversification: [
        { category: 'Contemporary', value: 40, amount: 119200000 },
        { category: 'Surrealist', value: 35, amount: 104300000 },
        { category: 'Modern/Abstract', value: 25, amount: 74500000 }
      ],
      riskMetrics: {
        volatilityScore: 6.8,
        liquidityScore: 7.5,
        diversificationScore: 8.8
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Buy': return 'text-green-600 bg-green-50';
        case 'Hold': return 'text-blue-600 bg-blue-50';
        case 'Sell': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    // Function to create chart path
    const createChartPath = (data) => {
      if (!data || data.length === 0) return '';
      
      const width = 1200;
      const height = 300;
      const padding = 20;
      
      const minValue = Math.min(...data.map(d => d.value));
      const maxValue = Math.max(...data.map(d => d.value));
      const valueRange = maxValue - minValue;
      
      const xStep = (width - 2 * padding) / (data.length - 1);
      const yScale = (height - 2 * padding) / valueRange;
      
      let path = `M ${padding} ${height - padding - ((data[0].value - minValue) * yScale)}`;
      
      for (let i = 1; i < data.length; i++) {
        const x = padding + i * xStep;
        const y = height - padding - ((data[i].value - minValue) * yScale);
        path += ` L ${x} ${y}`;
      }
      
      return path;
    };

    return (
      <div className="min-h-screen bg-white">
        <Header setCurrentPage={setCurrentPage} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Portfolio Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Art Portfolio</h1>
            <p className="text-gray-600">Track your collection's performance and get AI-powered insights</p>
          </div>

          {/* Total Value Section with Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Total Value</h2>
              
              <div className="flex items-baseline space-x-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(portfolioData.totalValue)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Day Change</p>
                  <p className={`text-xl font-semibold ${portfolioData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioData.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolioData.dayChange)} ({portfolioData.dayChange >= 0 ? '+' : ''}{portfolioData.dayChangePercent}%)
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">1-Year Change</p>
                  <p className={`text-xl font-semibold ${portfolioData.yearChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioData.yearChange >= 0 ? '+' : ''}{formatCurrency(portfolioData.yearChange)} ({portfolioData.yearChange >= 0 ? '+' : ''}{portfolioData.yearChangePercent}%)
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowTableView(!showTableView)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Table View</span>
              </button>
              
              <div className="flex space-x-2">
                {['1M', '3M', '6M', 'YTD', '1Y', '2Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTimeframe === period
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {period === 'YTD' ? 'YTD' : period === '1Y' ? '1 Yr' : period === '2Y' ? '2 Yr' : period + 'o'}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-80 bg-gray-50 rounded-lg p-4">
              <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="100" height="50" patternUnits="userSpaceOnUse">
                    <rect width="100" height="50" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="1200" height="300" fill="url(#grid)" />
                
                {/* Chart line */}
                <path
                  d={createChartPath(portfolioData.chartData[selectedTimeframe])}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
                
                {/* Area under line */}
                <path
                  d={createChartPath(portfolioData.chartData[selectedTimeframe]) + ` L 1180 280 L 20 280 Z`}
                  fill="url(#gradient)"
                  opacity="0.1"
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
                {portfolioData.chartData[selectedTimeframe].filter((_, i) => 
                  i === 0 || 
                  i === Math.floor(portfolioData.chartData[selectedTimeframe].length / 2) || 
                  i === portfolioData.chartData[selectedTimeframe].length - 1
                ).map((point, index) => (
                  <span key={index}>{point.date}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Value Card */}
            <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Portfolio Growth</h3>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {portfolioData.changePercent}%
              </p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  +{formatCurrency(portfolioData.totalChange)} YTD
                </span>
              </div>
            </div>

            {/* Risk Score Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Portfolio Risk Score</h3>
                <Shield className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Volatility</span>
                    <span>{portfolioData.riskMetrics.volatilityScore}/10</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${portfolioData.riskMetrics.volatilityScore * 10}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Liquidity</span>
                    <span>{portfolioData.riskMetrics.liquidityScore}/10</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${portfolioData.riskMetrics.liquidityScore * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Diversification Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Diversification</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                {portfolioData.diversification.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${category.value}%`,
                            background: index === 0 ? '#dc2626' : index === 1 ? '#2563eb' : '#7c3aed'
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{category.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Holdings */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Collection</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPortfolioView('grid')}
                  className={`p-2 rounded-lg ${
                    portfolioView === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setPortfolioView('list')}
                  className={`p-2 rounded-lg ${
                    portfolioView === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setPortfolioView('positions')}
                  className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                    portfolioView === 'positions' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Positions</span>
                </button>
              </div>
            </div>

            {portfolioView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.artworks.map((artwork) => (
                  <div key={artwork.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + artwork.artist.split(' ').map(n => n[0]).join('');
                      }}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900">{artwork.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{artwork.artist}, {artwork.year}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Current Value</span>
                          <span className="font-semibold">{formatCurrency(artwork.currentValue)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Change</span>
                          <span className={`text-sm font-medium ${artwork.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {artwork.change >= 0 ? '+' : ''}{formatCurrency(artwork.change)} ({artwork.changePercent}%)
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">AI Recommendation</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(artwork.status)}`}>
                            {artwork.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Artwork</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Purchase Price</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Current Value</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Change</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Risk</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.artworks.map((artwork) => (
                      <tr key={artwork.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={artwork.imageUrl}
                              alt={artwork.title}
                              className="w-12 h-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48?text=' + artwork.artist.split(' ').map(n => n[0]).join('');
                              }}
                            />
                            <div>
                              <p className="font-medium text-gray-900">{artwork.title}</p>
                              <p className="text-sm text-gray-600">{artwork.artist}, {artwork.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 text-gray-700">
                          {formatCurrency(artwork.purchasePrice)}
                        </td>
                        <td className="text-right py-4 px-4 font-semibold text-gray-900">
                          {formatCurrency(artwork.currentValue)}
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className={`font-medium ${artwork.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {artwork.change >= 0 ? '+' : ''}{formatCurrency(artwork.change)}
                            <br />
                            <span className="text-xs">({artwork.changePercent}%)</span>
                          </span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(artwork.riskLevel)}`}>
                            {artwork.riskLevel}
                          </span>
                        </td>
                        <td className="text-center py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(artwork.status)}`}>
                            {artwork.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {portfolioView === 'positions' && (
              <div className="space-y-6">
                {/* Contemporary Art Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                    onClick={() => setExpandedSections({...expandedSections, contemporary: !expandedSections.contemporary})}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedSections.contemporary ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-gray-900">Contemporary Art</h4>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-gray-600">Total Value: <span className="font-semibold text-gray-900">{formatCurrency(162500000)}</span></span>
                      <span className="text-green-600 font-medium">+30.0%</span>
                    </div>
                  </div>
                  
                  {expandedSections.contemporary && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-y border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Artist / Work</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Acquired</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AI Rec</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src="/images/artworks/Basquiat.jpeg" 
                                  alt="Basquiat artwork"
                                  className="w-10 h-10 rounded object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-10 h-10 rounded bg-gray-200 hidden items-center justify-center text-xs font-bold text-gray-600">JMB</div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Jean-Michel Basquiat</p>
                                  <p className="text-xs text-gray-500">Untitled, 1982</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4 text-sm text-gray-600">Mar 2021</td>
                            <td className="text-right py-4 px-4 text-sm text-gray-900">{formatCurrency(85000000)}</td>
                            <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">{formatCurrency(110500000)}</td>
                            <td className="text-right py-4 px-4">
                              <div className="text-sm">
                                <p className="font-medium text-green-600">+{formatCurrency(25500000)}</p>
                                <p className="text-xs text-green-600">+30.0%</p>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="text-sm font-medium text-green-600">+12.3%</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Low</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Hold</span>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src="/images/artworks/Mondrian.jpeg" 
                                  alt="Mondrian artwork"
                                  className="w-10 h-10 rounded object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-10 h-10 rounded bg-gray-200 hidden items-center justify-center text-xs font-bold text-gray-600">PM</div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Piet Mondrian</p>
                                  <p className="text-xs text-gray-500">Broadway Boogie-Woogie, 1943</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4 text-sm text-gray-600">Jan 2022</td>
                            <td className="text-right py-4 px-4 text-sm text-gray-900">{formatCurrency(38000000)}</td>
                            <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">{formatCurrency(52000000)}</td>
                            <td className="text-right py-4 px-4">
                              <div className="text-sm">
                                <p className="font-medium text-green-600">+{formatCurrency(14000000)}</p>
                                <p className="text-xs text-green-600">+36.8%</p>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="text-sm font-medium text-green-600">+18.4%</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">Medium</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Buy</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-gray-50 border-t border-gray-200">
                          <tr>
                            <td colSpan="3" className="py-3 px-4 text-sm font-medium text-gray-900">Contemporary Total</td>
                            <td className="text-right py-3 px-4 text-sm font-bold text-gray-900">{formatCurrency(162500000)}</td>
                            <td className="text-right py-3 px-4">
                              <div className="text-sm">
                                <p className="font-bold text-green-600">+{formatCurrency(39500000)}</p>
                                <p className="text-xs font-medium text-green-600">+32.1%</p>
                              </div>
                            </td>
                            <td colSpan="3"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>

                {/* Surrealist Art Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                    onClick={() => setExpandedSections({...expandedSections, surrealist: !expandedSections.surrealist})}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedSections.surrealist ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-gray-900">Surrealist Masters</h4>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-gray-600">Total Value: <span className="font-semibold text-gray-900">{formatCurrency(121000000)}</span></span>
                      <span className="text-green-600 font-medium">+27.4%</span>
                    </div>
                  </div>
                  
                  {expandedSections.surrealist && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-y border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Artist / Work</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Acquired</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AI Rec</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src="/images/artworks/Magritte.png" 
                                  alt="Magritte artwork"
                                  className="w-10 h-10 rounded object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-10 h-10 rounded bg-gray-200 hidden items-center justify-center text-xs font-bold text-gray-600">RM</div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">René Magritte</p>
                                  <p className="text-xs text-gray-500">The Empire of Light, 1954</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4 text-sm text-gray-600">Nov 2020</td>
                            <td className="text-right py-4 px-4 text-sm text-gray-900">{formatCurrency(95000000)}</td>
                            <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">{formatCurrency(121000000)}</td>
                            <td className="text-right py-4 px-4">
                              <div className="text-sm">
                                <p className="font-medium text-green-600">+{formatCurrency(26000000)}</p>
                                <p className="text-xs text-green-600">+27.4%</p>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="text-sm font-medium text-green-600">+11.2%</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Low</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Hold</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Modern Masters Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                    onClick={() => setExpandedSections({...expandedSections, modern: !expandedSections.modern})}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 transition-transform ${expandedSections.modern ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <h4 className="font-semibold text-gray-900">Modern Masters</h4>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="text-gray-600">Total Value: <span className="font-semibold text-gray-900">{formatCurrency(14500000)}</span></span>
                      <span className="text-green-600 font-medium">+20.8%</span>
                    </div>
                  </div>
                  
                  {expandedSections.modern && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-y border-gray-200">
                          <tr>
                            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Artist / Work</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Acquired</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">AI Rec</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src="/images/artworks/Picasso.webp" 
                                  alt="Picasso artwork"
                                  className="w-10 h-10 rounded object-cover"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-10 h-10 rounded bg-gray-200 hidden items-center justify-center text-xs font-bold text-gray-600">PP</div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">Pablo Picasso</p>
                                  <p className="text-xs text-gray-500">La Femme, 1953</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4 text-sm text-gray-600">Jun 2023</td>
                            <td className="text-right py-4 px-4 text-sm text-gray-900">{formatCurrency(12000000)}</td>
                            <td className="text-right py-4 px-4 text-sm font-semibold text-gray-900">{formatCurrency(14500000)}</td>
                            <td className="text-right py-4 px-4">
                              <div className="text-sm">
                                <p className="font-medium text-green-600">+{formatCurrency(2500000)}</p>
                                <p className="text-xs text-green-600">+20.8%</p>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="text-sm font-medium text-green-600">+10.4%</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Low</span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Hold</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Portfolio Summary */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Total Portfolio Value</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(298000000)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Total Gain/Loss</p>
                      <p className="text-2xl font-bold text-green-600">+{formatCurrency(68000000)}</p>
                      <p className="text-sm text-green-600">+29.6%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Annual Return</p>
                      <p className="text-2xl font-bold text-green-600">+14.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Portfolio Health</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
                          <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
                          <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
                          <div className="w-2 h-6 bg-green-500 rounded-sm"></div>
                          <div className="w-2 h-6 bg-gray-300 rounded-sm"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-blue-50 rounded-xl p-6 border border-red-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Portfolio Insights</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Your portfolio has appreciated 29.6% over the past year, outperforming the art market index by 21.1%</li>
                  <li>• Mondrian's Broadway Boogie-Woogie shows exceptional growth (+36.8%) - geometric abstraction gaining momentum</li>
                  <li>• Picasso's La Femme represents strong value with steady appreciation in the Blue Chip market</li>
                  <li>• Consider diversifying with more Abstract Expressionist works to balance the portfolio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



const VasariPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [evaluationData, setEvaluationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Mock art database
  const artDatabase = [
    {
      id: 1,
      title: "Untitled",
      artist: "Jean-Michel Basquiat",
      year: 1982,
      medium: "Acrylic and spray paint on canvas",
      dimensions: "183 × 173 cm",
      currentLocation: "Private Collection",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      estimatedValue: 110500000,
      lastSalePrice: 110500000,
      marketTrend: "rising",
      authenticity: {
        score: 95,
        risk: "Low",
        factors: ["Provenance verified", "Expert authentication", "Scientific analysis confirmed"]
      },
      roi: {
        score: 8.5,
        annualizedReturn: 12.3,
        projection: "Strong appreciation expected"
      }
    },
    {
      id: 2,
      title: "Water Lilies",
      artist: "Claude Monet",
      year: 1919,
      medium: "Oil on canvas",
      dimensions: "100 × 300 cm",
      currentLocation: "Private Collection",
      imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      estimatedValue: 45000000,
      lastSalePrice: 40100000,
      marketTrend: "stable",
      authenticity: {
        score: 88,
        risk: "Medium",
        factors: ["Some documentation gaps", "Style analysis positive", "Pigment analysis inconclusive"]
      },
      roi: {
        score: 7.2,
        annualizedReturn: 8.7,
        projection: "Steady growth anticipated"
      }
    }
  ];

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          file: file,
          url: e.target.result,
          name: file.name
        });
        analyzeUploadedArtwork(file, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeUploadedArtwork = (file, imageUrl) => {
    setLoading(true);
    setUploadMode(false);
    
    // Check if the file is Basquiat
    const isBasquiat = file.name.toLowerCase().includes('basquiat');
    
    // Simulate AI analysis of uploaded artwork
    setTimeout(() => {
      let analysisResult;
      
      if (isBasquiat) {
        // Accurate data for Basquiat's "Mind Blowing"
        analysisResult = {
          id: 'uploaded',
          title: "Mind Blowing",
          artist: "Jean-Michel Basquiat",
          year: 1985,
          medium: "Acrylic and oilstick on canvas",
          dimensions: "152.4 × 152.4 cm",
          currentLocation: "Private Collection",
          imageUrl: imageUrl,
          estimatedValue: 111200000,
          lastSalePrice: null,
          marketTrend: "rising",
          authenticity: {
            score: 98,
            risk: "Low",
            factors: [
              "Verified provenance since 1985", 
              "Authenticated by Basquiat Authentication Committee", 
              "Featured in major retrospectives"
            ]
          },
          roi: {
            score: 9.2,
            annualizedReturn: 18.5,
            projection: "Strong appreciation expected - Neo-Expressionism at peak demand"
          }
        };
      } else {
        // Generic analysis for other uploads
        analysisResult = {
          id: 'uploaded',
          title: "Uploaded Artwork",
          artist: "Unknown Artist",
          year: "Contemporary",
          medium: "Mixed Media",
          dimensions: "Estimated from image",
          currentLocation: "Private Collection",
          imageUrl: imageUrl,
          estimatedValue: Math.floor(Math.random() * 50000) + 5000,
          lastSalePrice: null,
          marketTrend: "emerging",
          authenticity: {
            score: Math.floor(Math.random() * 40) + 50,
            risk: Math.random() > 0.5 ? "Medium" : "High",
            factors: [
              "Image-based analysis only", 
              "Style recognition performed", 
              "Physical inspection required for full authentication"
            ]
          },
          roi: {
            score: Math.round((Math.floor(Math.random() * 40) + 30) / 10 * 10) / 10,
            annualizedReturn: Math.floor(Math.random() * 15) + 5,
            projection: "Speculative investment - requires market validation"
          }
        };
      }
      
      setSelectedArtwork(analysisResult);
      generateEvaluationData(analysisResult);
      setLoading(false);
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const artwork = artDatabase.find(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (artwork) {
        setSelectedArtwork(artwork);
        generateEvaluationData(artwork);
      }
      setLoading(false);
    }, 1500);
  };

  const generateEvaluationData = (artwork) => {
    // Simulate AI evaluation process
    const evaluation = {
      priceAnalysis: {
        currentEstimate: artwork.estimatedValue,
        confidenceInterval: [artwork.estimatedValue * 0.85, artwork.estimatedValue * 1.15],
        marketFactors: [
          { factor: "Artist reputation", impact: "+15%", weight: "High" },
          { factor: "Historical significance", impact: "+12%", weight: "High" },
          { factor: "Market demand", impact: "+8%", weight: "Medium" },
          { factor: "Condition", impact: "-2%", weight: "Low" }
        ]
      },
      riskAssessment: {
        overall: artwork.authenticity.risk,
        factors: [
          { category: "Provenance", risk: "Low", details: "Complete ownership history" },
          { category: "Authentication", risk: artwork.authenticity.risk, details: "Expert verification needed" },
          { category: "Legal", risk: "Low", details: "Clear title" },
          { category: "Market", risk: "Medium", details: "Price volatility present" }
        ]
      },
      investmentMetrics: {
        roiScore: artwork.roi.score,
        timeHorizon: "5-10 years",
        liquidityScore: 6.8,
        diversificationBenefit: "High"
      },
      comparableSales: {
        recentSales: artwork.artist === "Jean-Michel Basquiat" ? [
          { title: '"Untitled" (1982)', price: '$110.5M', date: 'May 2022' },
          { title: '"In This Case" (1983)', price: '$93.1M', date: 'May 2021' },
          { title: '"Versus Medici" (1982)', price: '$50.8M', date: 'May 2021' },
          { title: '"Flesh and Spirit" (1983)', price: '$30.9M', date: 'May 2020' }
        ] : [
          { title: '"Similar Work I"', price: formatCurrency(artwork.estimatedValue * 0.9), date: 'May 2024' },
          { title: '"Similar Work II"', price: formatCurrency(artwork.estimatedValue * 0.85), date: 'Feb 2024' },
          { title: '"Similar Work III"', price: formatCurrency(artwork.estimatedValue * 0.75), date: 'Nov 2023' },
          { title: '"Similar Work IV"', price: formatCurrency(artwork.estimatedValue * 0.7), date: 'Aug 2023' }
        ],
        avgAppreciation: artwork.artist === "Jean-Michel Basquiat" ? 18.5 : 15
      },
      liquidityAnalysis: {
        avgSaleTime: artwork.artist === "Jean-Michel Basquiat" ? '3-6 months' : '3-6 months',
        activeBuyers: artwork.artist === "Jean-Michel Basquiat" ? 47 : 25,
        auctionFrequency: 'Quarterly'
      },
      insuranceStorage: {
        climateStorage: 48000,
        security: 12000
      },
      collectorProfile: {
        demographics: artwork.artist === "Jean-Michel Basquiat" ? [
          { category: 'Tech entrepreneurs', percentage: 42 },
          { category: 'Traditional collectors', percentage: 31 },
          { category: 'Museums/Institutions', percentage: 18 },
          { category: 'Investment funds', percentage: 9 }
        ] : [
          { category: 'Tech entrepreneurs', percentage: 35 },
          { category: 'Traditional collectors', percentage: 40 },
          { category: 'Museums/Institutions', percentage: 15 },
          { category: 'Investment funds', percentage: 10 }
        ],
        ageGroup: artwork.artist === "Jean-Michel Basquiat" ? '35-50 years' : '35-50 years',
        agePercentage: artwork.artist === "Jean-Michel Basquiat" ? 68 : 68,
        regions: artwork.artist === "Jean-Michel Basquiat" ? 'NYC 45%, LA 22%, London 18%' : 'NYC 45%, LA 22%, London 18%'
      }
    };
    
    setEvaluationData(evaluation);
  };

  

  return (
  <div>
    <div style={{ display: currentPage === 'landing' ? 'block' : 'none' }}>
      <LandingPage setCurrentPage={setCurrentPage} />
    </div>
    <div style={{ display: currentPage === 'try-vasari' ? 'block' : 'none' }}>
      <TryVasariPage setCurrentPage={setCurrentPage} />
    </div>
    <div style={{ display: currentPage === 'evaluation' ? 'block' : 'none' }}>
      <EvaluationPage 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedArtwork={selectedArtwork}
        setSelectedArtwork={setSelectedArtwork}
        evaluationData={evaluationData}
        setEvaluationData={setEvaluationData}
        loading={loading}
        setLoading={setLoading}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        uploadMode={uploadMode}
        setUploadMode={setUploadMode}
        dragOver={dragOver}
        setDragOver={setDragOver}
        handleSearch={handleSearch}
        handleImageUpload={handleImageUpload}
        analyzeUploadedArtwork={analyzeUploadedArtwork}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        generateEvaluationData={generateEvaluationData}
        formatCurrency={formatCurrency}
        getRiskColor={getRiskColor}
        getTrendIcon={getTrendIcon}
        artDatabase={artDatabase}
        setCurrentPage={setCurrentPage}
      />
    </div>
    <div style={{ display: currentPage === 'portfolio' ? 'block' : 'none' }}>
      <PortfolioPage 
        setCurrentPage={setCurrentPage} 
        formatCurrency={formatCurrency} 
      />
    </div>
  </div>
);



// Default to landing page
return <LandingPage setCurrentPage={setCurrentPage} />;
};

export default VasariPlatform;  
