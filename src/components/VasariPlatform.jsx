import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Shield, AlertTriangle, DollarSign, Eye, Calendar, MapPin, User, FileText, BarChart3, PieChart, Activity, Upload, Camera, X } from 'lucide-react';

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
      title: "Starry Night Over the Rhône",
      artist: "Vincent van Gogh",
      year: 1888,
      medium: "Oil on canvas",
      dimensions: "72.5 × 92 cm",
      currentLocation: "Musée d'Orsay, Paris",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      estimatedValue: 150000000,
      lastSalePrice: 82500000,
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
    
    // Simulate AI analysis of uploaded artwork
    setTimeout(() => {
      const analysisResult = {
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
      }
    };
    
    setEvaluationData(evaluation);
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

  // Landing Page Component
  const LandingPage = () => {
    const [heroRef, heroVisible] = useIntersectionObserver(0.3);
    const [featuresRef, featuresVisible] = useIntersectionObserver(0.3);
    const [problemRef, problemVisible] = useIntersectionObserver(0.3);
    const [solutionRef, solutionVisible] = useIntersectionObserver(0.3);
    const [foundersRef, foundersVisible] = useIntersectionObserver(0.3);
    
    return (
      <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {/* Header */}
        <header className="px-6 py-6 bg-white border-b border-gray-200 relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 rounded-lg relative" style={{ borderColor: '#dc2626', background: 'transparent' }}>
                {/* Inner diamond in red and white */}
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
                    background: '#dc2626',
                    border: '1px solid #dc2626'
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
                      height: '1px',
                      top: '50%',
                      left: '0',
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                  {/* Vertical line of plus */}
                  <div 
                    className="absolute bg-white"
                    style={{
                      width: '1px',
                      height: '100%',
                      top: '0',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-lg font-semibold text-red-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Vasari</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage('evaluation')}
                className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg border border-red-300 flex items-center space-x-2"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <Eye className="w-4 h-4" />
                <span>EVALUATE ARTWORK</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative pt-0" style={{ transform: 'translateY(-8rem)' }}>
          <div className="relative flex flex-col items-center justify-center">
            {/* All the balls and stars animations stays the same */}
            <svg width="1400" height="1200" className="absolute">
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
                AI arthouse solutions all in one place.
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
              25% { transform: translate(520px, 0); }
              50% { transform: translate(520px, 620px); }
              75% { transform: translate(0, 620px); }
              100% { transform: translate(0, 0); }
            }
            
            @keyframes squareOrbitCounterClockwise {
              0% { transform: translate(0, 0); }
              25% { transform: translate(0, 620px); }
              50% { transform: translate(-520px, 620px); }
              75% { transform: translate(-520px, 0); }
              100% { transform: translate(0, 0); }
            }
          `}</style>
        </section>

        {/* What we do Section */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-8">What we do</p>
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                We bring <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">trust to the value of millions of dollars in art assets.</span> Our models analyze risk and biases on multiple value dimensions for both illiquid and liquid assets, addressing speculative, mispricing, future risks on values and more, at scale.
              </p>
            </div>
          </div>
        </section>

        {/* Separator Line */}
        <div className="bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="border-t border-gray-300"></div>
          </div>
        </div>

        {/* AI System Introduction */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-4">Introducing our latest AI systems</p>
            <h2 className="text-5xl font-black text-gray-900 mb-16" style={{ fontFamily: 'JetBrains Mono, monospace' }}>VASARI-AI</h2>
            
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed mb-16">
              <p>
                Designed and trained specifically for the financial industry dealing with art assets. It analyzes and monitors risk on value for millions of art assets (illiquid or liquid), providing an analysis depth that is <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">50 times</span> greater and a scope <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">70 times</span> broader than any existing solution.
              </p>
            </div>

            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                Our client roster includes global insurance and wealth management firms across <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">9 countries</span> and <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">2 continents.</span> They leverage our latest VASARI-AI models to provide insurance value risk assessment and portfolio optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-8">Our vision</p>
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                We want art assets worth trillions of dollars to be <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">trusted for their value,</span> leveraged and made liquid at a fair value to benefit the entire ecosystem—from financial players and creators to distributors and collectors.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-32 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 8s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <DollarSign className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Instant pricing</h3>
                <p className="text-lg text-white text-opacity-90">AI-powered market analysis in seconds</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 9s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Authenticity check</h3>
                <p className="text-lg text-white text-opacity-90">Advanced authentication algorithms</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 10s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">ROI analysis</h3>
                <p className="text-lg text-white text-opacity-90">Investment potential scoring</p>
              </div>
              <div className="text-center p-6 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #dc2626, #2563eb, #dc2626, #2563eb)', backgroundSize: '300% 300%', animation: 'shimmer 11s ease-in-out infinite' }}>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white border-opacity-30">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Market trends</h3>
                <p className="text-lg text-white text-opacity-90">Real-time market intelligence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-500 text-lg mb-8">Innovation-driven</p>
            <div className="space-y-8 text-4xl text-gray-900 leading-relaxed">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">92% of our resources</span> are invested in advancing AI technology for art market analysis. We develop cutting-edge machine learning algorithms and deploy them through strategic partnerships with galleries, auction houses, and financial institutions across North America and Europe.
              </p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section ref={foundersRef} className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-gray-900 mb-6">Meet the Founders</h3>
              <p className="text-xl text-gray-700">The team building the future of art market intelligence</p>
            </div>
            
            {/* Names listed horizontally */}
            <div className="text-center mb-16">
              <h4 className="text-4xl font-semibold text-gray-900 mb-8">
                Noah Cha • Helen Qin • Samarth Dubey • Cisco Salazar
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-blue-300">
                  <span className="text-3xl font-bold text-white">HQ</span>
                </div>
                <p className="text-blue-600 font-medium mb-3">Co-Founder & CPO</p>
                <p className="text-gray-600">AI database development and outreach</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-gray-400">
                  <span className="text-3xl font-bold text-white">SD</span>
                </div>
                <p className="text-gray-800 font-medium mb-3">Co-Founder & Chief Scientist</p>
                <p className="text-gray-600">AI analytics and research</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-red-300">
                  <span className="text-3xl font-bold text-white">CS</span>
                </div>
                <p className="text-red-600 font-medium mb-3">Co-Founder & Brand Director</p>
                <p className="text-gray-600">Software engineer</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-red-300">
                  <span className="text-3xl font-bold text-white">NC</span>
                </div>
                <p className="text-red-600 font-medium mb-3">Co-Founder & CTO</p>
                <p className="text-gray-600">Fullstack development, UI design</p>
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

  const EvaluationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vasari</h1>
                <p className="text-sm text-gray-500">Professional Art Evaluation Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('landing')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Home
              </button>
              <span className="text-sm text-gray-600">AI-Powered Analysis</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Art Evaluation</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {setUploadMode(false); setUploadedImage(null);}}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !uploadMode ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Search Database
              </button>
              <button
                onClick={() => setUploadMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploadMode ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center space-x-2"
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
                      <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
                  <DollarSign className="w-6 h-6 text-green-600" />
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
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Investment Metrics</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">ROI Score</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-purple-600">
                        {selectedArtwork.roi.score}/10
                      </span>
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${selectedArtwork.roi.score * 10}%` }}
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
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-blue-900">
                      {selectedArtwork.id === 'uploaded' ? 'AI Analysis Recommendation' : 'Investment Recommendation'}
                    </h5>
                    <p className="text-sm text-blue-700 mt-1">
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

  // Main render logic
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  return <EvaluationPage />;
};

export default VasariPlatform;
