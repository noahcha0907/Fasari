import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Shield, AlertTriangle, DollarSign, Eye, Calendar, MapPin, User, FileText, BarChart3, PieChart, Activity, Upload, Camera, X, ArrowLeftRight, Mail } from 'lucide-react';

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

  // Shared Header Component
  const Header = () => (
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
          <div className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg shadow-lg border border-black flex flex-col items-center cursor-not-allowed"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>EVALUATE ARTWORK</span>
            </div>
            <span className="text-[10px] mt-0.5 text-gray-300">Coming soon</span>
          </div>
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

  // Landing Page Component
  const LandingPage = () => {
    const [heroRef, heroVisible] = useIntersectionObserver(0.3);
    const [featuresRef, featuresVisible] = useIntersectionObserver(0.3);
    const [problemRef, problemVisible] = useIntersectionObserver(0.3);
    const [solutionRef, solutionVisible] = useIntersectionObserver(0.3);
    const [foundersRef, foundersVisible] = useIntersectionObserver(0.3);
    
    return (
      <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Header />

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <p className="text-gray-800 font-medium">Co-Founder & COO</p>
                <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <Mail className="w-3 h-3 mr-1" />
                  samarth@getvasari.com
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-gray-700">
                  Cisco<br />Salazar
                </h3>
                <p className="text-red-600 font-medium">Co-Founder & CFO</p>
                <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                  <Mail className="w-3 h-3 mr-1" />
                  francisco@getvasari.com
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

  const EvaluationPage = () => (
    <div className="min-h-screen bg-white">
      <Header />

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

  // Vasari V.01 Page Component
  const VasariV01Page = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);
    const cameraRef = useRef(null);
    const raycasterRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 }); // Use plain object initially
    const [activeFolder, setActiveFolder] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [isDraggingWindow, setIsDraggingWindow] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDraggingArtwork, setIsDraggingArtwork] = useState(false);
    const [draggedArtwork, setDraggedArtwork] = useState(null);
    const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
    const particlesRef = useRef([]);
    const cubeGroupRef = useRef(null);
    const icosahedronRef = useRef(null);
    const constellationRef = useRef(null);
    const blackLinesRef = useRef(null);

    useEffect(() => {
      if (!mountRef.current) return;
      
      // Check if renderer already exists to prevent double initialization
      if (rendererRef.current) return;

      // Import Three.js
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.async = true;
      
      script.onload = () => {
        if (!window.THREE || !mountRef.current) return;
        
        // Double-check renderer doesn't exist
        if (rendererRef.current) return;

        // Scene setup
        const scene = new window.THREE.Scene();
        scene.background = null; // Make scene background transparent
        sceneRef.current = scene;

        // Camera setup
        const camera = new window.THREE.PerspectiveCamera(
          75,
          window.innerWidth / (window.innerHeight - 88),
          0.1,
          1000
        );
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight - 88);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // Transparent background
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Raycaster for mouse interaction
        const raycaster = new window.THREE.Raycaster();
        raycasterRef.current = raycaster;

        // Create wireframe box using rectangular prisms for edges
        const boxGroup = new window.THREE.Group();
        const edgeThickness = 0.03; // Thickness of the edges - reduced
        const boxSize = 1.0; // Reduced from 1.5
        
        // Material for edges with gradient effect
        const edgeMaterial = new window.THREE.MeshBasicMaterial({ color: 0xdc2626 });
        const edgeMaterialBlue = new window.THREE.MeshBasicMaterial({ color: 0x2563eb });
        
        // Create 12 edges of the box
        // Bottom edges (red)
        const bottomEdges = [
          { pos: [0, -boxSize/2, -boxSize/2], rot: [0, 0, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [0, -boxSize/2, boxSize/2], rot: [0, 0, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [-boxSize/2, -boxSize/2, 0], rot: [0, Math.PI/2, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [boxSize/2, -boxSize/2, 0], rot: [0, Math.PI/2, 0], size: [boxSize, edgeThickness, edgeThickness] }
        ];
        
        bottomEdges.forEach(edge => {
          const geometry = new window.THREE.BoxGeometry(...edge.size);
          const mesh = new window.THREE.Mesh(geometry, edgeMaterial);
          mesh.position.set(...edge.pos);
          mesh.rotation.set(...edge.rot);
          boxGroup.add(mesh);
        });
        
        // Top edges (blue)
        const topEdges = [
          { pos: [0, boxSize/2, -boxSize/2], rot: [0, 0, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [0, boxSize/2, boxSize/2], rot: [0, 0, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [-boxSize/2, boxSize/2, 0], rot: [0, Math.PI/2, 0], size: [boxSize, edgeThickness, edgeThickness] },
          { pos: [boxSize/2, boxSize/2, 0], rot: [0, Math.PI/2, 0], size: [boxSize, edgeThickness, edgeThickness] }
        ];
        
        topEdges.forEach(edge => {
          const geometry = new window.THREE.BoxGeometry(...edge.size);
          const mesh = new window.THREE.Mesh(geometry, edgeMaterialBlue);
          mesh.position.set(...edge.pos);
          mesh.rotation.set(...edge.rot);
          boxGroup.add(mesh);
        });
        
        // Vertical edges (gradient from red to blue)
        const verticalEdges = [
          { pos: [-boxSize/2, 0, -boxSize/2] },
          { pos: [boxSize/2, 0, -boxSize/2] },
          { pos: [-boxSize/2, 0, boxSize/2] },
          { pos: [boxSize/2, 0, boxSize/2] }
        ];
        
        verticalEdges.forEach(edge => {
          const geometry = new window.THREE.BoxGeometry(edgeThickness, boxSize, edgeThickness);
          
          // Create gradient material using vertex colors
          const material = new window.THREE.MeshBasicMaterial({ vertexColors: true });
          
          // Apply gradient colors to vertices
          const colors = [];
          const positionAttribute = geometry.attributes.position;
          for (let i = 0; i < positionAttribute.count; i++) {
            const y = positionAttribute.getY(i);
            const t = (y + boxSize/2) / boxSize;
            const r = 0xdc * (1 - t) + 0x25 * t;
            const g = 0x26 * (1 - t) + 0x63 * t;
            const b = 0x26 * (1 - t) + 0xeb * t;
            colors.push(r/255, g/255, b/255);
          }
          geometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));
          
          const mesh = new window.THREE.Mesh(geometry, material);
          mesh.position.set(...edge.pos);
          boxGroup.add(mesh);
        });
        
        // Add grid to each face
        const gridDivisions = 5;
        const gridThickness = 0.005; // Thickness of grid lines
        const gridMaterial = new window.THREE.MeshBasicMaterial({ color: 0x888888, opacity: 0.3, transparent: true });
        
        // Function to create grid lines for a face
        const createFaceGrid = (position, rotation) => {
          const gridGroup = new window.THREE.Group();
          
          // Horizontal lines
          for (let i = 1; i < gridDivisions; i++) {
            const offset = (i / gridDivisions - 0.5) * boxSize;
            const geometry = new window.THREE.BoxGeometry(boxSize, gridThickness, gridThickness);
            const line = new window.THREE.Mesh(geometry, gridMaterial);
            line.position.set(0, offset, 0);
            gridGroup.add(line);
          }
          
          // Vertical lines
          for (let i = 1; i < gridDivisions; i++) {
            const offset = (i / gridDivisions - 0.5) * boxSize;
            const geometry = new window.THREE.BoxGeometry(gridThickness, boxSize, gridThickness);
            const line = new window.THREE.Mesh(geometry, gridMaterial);
            line.position.set(offset, 0, 0);
            gridGroup.add(line);
          }
          
          gridGroup.position.set(...position);
          gridGroup.rotation.set(...rotation);
          return gridGroup;
        };
        
        // Create grids for all 6 faces
        const faces = [
          { pos: [0, 0, boxSize/2], rot: [0, 0, 0] }, // Front
          { pos: [0, 0, -boxSize/2], rot: [0, Math.PI, 0] }, // Back
          { pos: [boxSize/2, 0, 0], rot: [0, Math.PI/2, 0] }, // Right
          { pos: [-boxSize/2, 0, 0], rot: [0, -Math.PI/2, 0] }, // Left
          { pos: [0, boxSize/2, 0], rot: [Math.PI/2, 0, 0] }, // Top
          { pos: [0, -boxSize/2, 0], rot: [-Math.PI/2, 0, 0] } // Bottom
        ];
        
        faces.forEach(face => {
          boxGroup.add(createFaceGrid(face.pos, face.rot));
        });
        
        scene.add(boxGroup);
        cubeGroupRef.current = boxGroup;
        
        // Move the box and icosahedron up
        boxGroup.position.y = 0.5;
        
        // Create shadow for the cube
        const cubeShadowGeometry = new window.THREE.PlaneGeometry(1.5, 1.5);
        
        // Create canvas for gradient shadow
        const shadowCanvas = document.createElement('canvas');
        shadowCanvas.width = 256;
        shadowCanvas.height = 256;
        const shadowCtx = shadowCanvas.getContext('2d');
        
        // Create radial gradient
        const shadowGradient = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
        shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
        shadowGradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.25)');
        shadowGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.1)');
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        shadowCtx.fillStyle = shadowGradient;
        shadowCtx.fillRect(0, 0, 256, 256);
        
        const cubeShadowTexture = new window.THREE.CanvasTexture(shadowCanvas);
        const cubeShadowMaterial = new window.THREE.MeshBasicMaterial({
          map: cubeShadowTexture,
          transparent: true,
          side: window.THREE.DoubleSide,
          depthWrite: false
        });
        
        const cubeShadow = new window.THREE.Mesh(cubeShadowGeometry, cubeShadowMaterial);
        cubeShadow.rotation.x = -Math.PI / 2;
        cubeShadow.position.set(0, -0.8, 0); // Position below the cube
        scene.add(cubeShadow);

        // Create folder visual
        const createFolder = (x, y, z, scale = 1, label = '', artworkUrl = '') => {
          const folderGroup = new window.THREE.Group();
          
          // Create rounded box geometry
          const createRoundedBoxGeometry = (width, height, depth, radius) => {
            const shape = new window.THREE.Shape();
            const halfWidth = width / 2;
            const halfHeight = height / 2;
            
            shape.moveTo(-halfWidth + radius, -halfHeight);
            shape.lineTo(halfWidth - radius, -halfHeight);
            shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
            shape.lineTo(halfWidth, halfHeight - radius);
            shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
            shape.lineTo(-halfWidth + radius, halfHeight);
            shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
            shape.lineTo(-halfWidth, -halfHeight + radius);
            shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);
            
            const extrudeSettings = {
              depth: depth,
              bevelEnabled: true,
              bevelThickness: 0.005,
              bevelSize: 0.005,
              bevelSegments: 2
            };
            
            return new window.THREE.ExtrudeGeometry(shape, extrudeSettings);
          };
          
          // Create shadow plane
          const shadowGeometry = new window.THREE.PlaneGeometry(0.8 * scale, 0.6 * scale);
          
          // Create a canvas for gradient shadow texture
          const canvas = document.createElement('canvas');
          canvas.width = 128;
          canvas.height = 128;
          const ctx = canvas.getContext('2d');
          
          // Create radial gradient for soft shadow effect
          const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
          gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
          gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 128, 128);
          
          // Create texture from canvas
          const shadowTexture = new window.THREE.CanvasTexture(canvas);
          
          const shadowMaterial = new window.THREE.MeshBasicMaterial({ 
            map: shadowTexture,
            transparent: true,
            side: window.THREE.DoubleSide,
            depthWrite: false
          });
          const shadow = new window.THREE.Mesh(shadowGeometry, shadowMaterial);
          shadow.rotation.x = -Math.PI / 2; // Rotate to be horizontal
          shadow.position.set(0, -0.7 * scale, 0); // Position below folder and text
          folderGroup.add(shadow);
          
          // Folder back part with rounded corners
          const folderBackGeometry = createRoundedBoxGeometry(0.7 * scale, 0.5 * scale, 0.02 * scale, 0.03 * scale);
          const folderMaterial = new window.THREE.MeshBasicMaterial({ color: 0x5DADE2 }); // Light blue
          const folderBack = new window.THREE.Mesh(folderBackGeometry, folderMaterial);
          folderBack.position.set(0, 0, -0.01 * scale);
          folderGroup.add(folderBack);
          
          // Folder tab with rounded corners
          const tabGeometry = createRoundedBoxGeometry(0.15 * scale, 0.05 * scale, 0.02 * scale, 0.01 * scale);
          const tab = new window.THREE.Mesh(tabGeometry, folderMaterial);
          tab.position.set(-0.275 * scale, 0.275 * scale, -0.01 * scale);
          folderGroup.add(tab);
          
          // Folder front part with rounded corners (slightly darker blue)
          const folderFrontMaterial = new window.THREE.MeshBasicMaterial({ color: 0x3498DB });
          const folderFrontGeometry = createRoundedBoxGeometry(0.68 * scale, 0.48 * scale, 0.02 * scale, 0.03 * scale);
          const folderFront = new window.THREE.Mesh(folderFrontGeometry, folderFrontMaterial);
          folderFront.position.set(0, -0.02 * scale, 0.01 * scale);
          folderGroup.add(folderFront);
          
          // Add text label
          if (label) {
            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 256;
            labelCanvas.height = 64;
            const labelCtx = labelCanvas.getContext('2d');
            
            labelCtx.font = `${scale < 1 ? 40 : 32 * scale}px Arial`;
            labelCtx.fillStyle = '#333333';
            labelCtx.textAlign = 'center';
            labelCtx.textBaseline = 'middle';
            labelCtx.fillText(label, 128, 32);
            
            const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
            const labelMaterial = new window.THREE.MeshBasicMaterial({ 
              map: labelTexture,
              transparent: true,
              side: window.THREE.DoubleSide
            });
            
            const labelGeometry = new window.THREE.PlaneGeometry(0.8 * scale, 0.2 * scale);
            const labelMesh = new window.THREE.Mesh(labelGeometry, labelMaterial);
            labelMesh.position.set(0, -0.5 * scale, 0.02);
            folderGroup.add(labelMesh);
          }
          
          // Position folder
          folderGroup.position.set(x, y, z);
          // No rotation - folder faces directly toward the user
          
          // Store shadow reference and artwork URL for animation
          folderGroup.userData.shadow = shadow;
          folderGroup.userData.artworkUrl = artworkUrl;
          folderGroup.userData.artistName = label;
          
          return folderGroup;
        };
        
        // Artwork data mapping
        const artworkData = {
          'Basquiat': '/images/artworks/Basquiat.jpeg',
          'Mondrian': '/images/artworks/Mondrian.jpeg',
          'Picasso': '/images/artworks/Picasso.webp',
          'Monet': '/images/artworks/Monet.jpg',
          'Van Gogh': '/images/artworks/Van Gogh.png',
          'Magritte': '/images/artworks/Magritte.png'
        };
        
        // Create 5 folders at different positions with artist names and artwork URLs
        // Back folders (smaller size) - moved much closer to front folders
        const folder1 = createFolder(3.5, -0.5, 0, 0.8, 'Picasso', artworkData['Picasso']);    // Top right - moved down
        const folder2 = createFolder(-3.5, -0.5, 0, 0.8, 'Basquiat', artworkData['Basquiat']);   // Top left - moved down
        
        // Front folders (larger size)
        const folder3 = createFolder(3.5, -2.0, 0, 1.3, 'Magritte', artworkData['Magritte']);   // Bottom right
        const folder4 = createFolder(-3.5, -2.0, 0, 1.3, 'Van Gogh', artworkData['Van Gogh']);  // Bottom left
        const folder5 = createFolder(0, -2.5, 0, 1.3, 'Monet', artworkData['Monet']);     // Bottom center
        
        scene.add(folder1);
        scene.add(folder2);
        scene.add(folder3);
        scene.add(folder4);
        scene.add(folder5);
        
        // Store folders in array for animation
        const folders = [folder1, folder2, folder3, folder4, folder5];
        const initialPositions = folders.map(folder => ({
          x: folder.position.x,
          y: folder.position.y,
          z: folder.position.z
        }));

        // Mouse event handlers
        const handleMouseMove = (event) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const handleClick = (event) => {
          event.preventDefault();
          
          raycaster.setFromCamera(mouseRef.current, camera);
          
          const intersects = raycaster.intersectObjects(folders, true);
          
          if (intersects.length > 0) {
            let clickedObject = intersects[0].object;
            let folderGroup = clickedObject;
            
            // Find the parent folder group
            while (folderGroup.parent && !folderGroup.userData.artistName) {
              folderGroup = folderGroup.parent;
            }
            
            if (folderGroup.userData.artistName && folderGroup.userData.artworkUrl) {
              // Convert 3D position to screen coordinates
              const vector = new window.THREE.Vector3();
              folderGroup.getWorldPosition(vector);
              vector.project(camera);
              
              const canvas = renderer.domElement;
              const rect = canvas.getBoundingClientRect();
              
              // Convert to actual screen coordinates
              const x = ((vector.x + 1) / 2) * rect.width + rect.left;
              let y = ((1 - vector.y) / 2) * rect.height + rect.top - 88; // Subtract header height
              
              // Adjust Y position for specific folders
              if (folderGroup.userData.artistName === 'Basquiat' || folderGroup.userData.artistName === 'Picasso') {
                y = y - 100; // Normal position for moved folders
              } else {
                y = y - 150; // Normal position above folder
              }
              
              setPopupPosition({ x, y });
              setActiveFolder({
                name: folderGroup.userData.artistName,
                artworkUrl: folderGroup.userData.artworkUrl
              });
            }
          }
        };

        window.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleClick);

        // Create particle explosion effect
        const createParticleExplosion = (position, color) => {
          const particleCount = 50;
          const particles = [];
          
          for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new window.THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new window.THREE.MeshBasicMaterial({ 
              color: color || 0xFFD700,
              transparent: true,
              opacity: 1
            });
            const particle = new window.THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.copy(position);
            particle.velocity = new window.THREE.Vector3(
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.1
            );
            
            scene.add(particle);
            particles.push(particle);
          }
          
          return particles;
        };

        // Animate particles
        const animateParticles = () => {
          particlesRef.current.forEach((particle, index) => {
            particle.position.add(particle.velocity);
            particle.material.opacity -= 0.02;
            particle.scale.multiplyScalar(0.98);
            
            if (particle.material.opacity <= 0) {
              scene.remove(particle);
              particlesRef.current.splice(index, 1);
            }
          });
        };

        // Store animation functions for use in main loop
        window.animateParticles = animateParticles;
        window.createParticleExplosion = createParticleExplosion;

        // Create icosahedron inside the box
        const icosahedronGeometry = new window.THREE.IcosahedronGeometry(0.7, 0); // Reduced from 1.0
        
        // Create gradient material using vertex colors
        const icosahedronMaterial = new window.THREE.MeshBasicMaterial({ 
          vertexColors: true,
          wireframe: false
        });
        
        // Apply gradient colors based on vertex height
        const colors = [];
        const positionAttribute = icosahedronGeometry.attributes.position;
        const color1 = new window.THREE.Color(0xdc2626); // red
        const color2 = new window.THREE.Color(0x2563eb); // blue
        
        for (let i = 0; i < positionAttribute.count; i++) {
          const y = positionAttribute.getY(i);
          const t = (y + 1.0) / 2.0; // normalize y position (-1 to 1 becomes 0 to 1)
          const color = color1.clone().lerp(color2, t);
          colors.push(color.r, color.g, color.b);
        }
        
        icosahedronGeometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));
        
        const icosahedron = new window.THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
        icosahedron.position.y = 0.5; // Move up to match box position
        scene.add(icosahedron);
        icosahedronRef.current = icosahedron;

        // Create edge geometry for icosahedron outline with thicker lines
        const edges = new window.THREE.EdgesGeometry(icosahedronGeometry);
        const edgeVertices = edges.attributes.position.array;
        
        // Create thick edges using cylinders
        const edgeRadius = 0.015; // Thickness of the edges - reduced
        const edgeMat = new window.THREE.MeshBasicMaterial({ color: 0xffffff });
        
        for (let i = 0; i < edgeVertices.length; i += 6) {
          const start = new window.THREE.Vector3(edgeVertices[i], edgeVertices[i + 1], edgeVertices[i + 2]);
          const end = new window.THREE.Vector3(edgeVertices[i + 3], edgeVertices[i + 4], edgeVertices[i + 5]);
          
          const direction = new window.THREE.Vector3().subVectors(end, start);
          const length = direction.length();
          direction.normalize();
          
          const cylinderGeometry = new window.THREE.CylinderGeometry(edgeRadius, edgeRadius, length, 6);
          const cylinder = new window.THREE.Mesh(cylinderGeometry, edgeMat);
          
          // Position and orient the cylinder
          const midpoint = new window.THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
          cylinder.position.copy(midpoint);
          
          // Align cylinder with edge
          const up = new window.THREE.Vector3(0, 1, 0);
          const quaternion = new window.THREE.Quaternion().setFromUnitVectors(up, direction);
          cylinder.quaternion.copy(quaternion);
          
          icosahedron.add(cylinder);
        }

        // Animation loop
        const animate = () => {
          frameRef.current = requestAnimationFrame(animate);

          // Rotate both objects slowly
          boxGroup.rotation.x += 0.005;
          boxGroup.rotation.y += 0.005;
          
          icosahedron.rotation.x += 0.02;
          icosahedron.rotation.y += 0.02;
          
          // Animate folders floating
          const time = Date.now() * 0.001; // Convert to seconds
          folders.forEach((folder, index) => {
            const offset = index * 0.5; // Different phase for each folder
            
            // Vertical floating motion
            const floatHeight = Math.sin(time * 0.8 + offset) * 0.1;
            folder.position.y = initialPositions[index].y + floatHeight;
            
            // Slight horizontal drift
            folder.position.x = initialPositions[index].x + Math.sin(time * 0.6 + offset + Math.PI/2) * 0.05;
            
            // Very subtle tilt (not full rotation)
            folder.rotation.z = Math.sin(time * 0.7 + offset) * 0.02; // Max 1.15 degrees
            folder.rotation.x = Math.sin(time * 0.9 + offset + Math.PI/3) * 0.015; // Max 0.86 degrees
            
            // Animate shadow - gets smaller/more transparent when folder is higher
            if (folder.userData.shadow) {
              const shadowScale = 1 - (floatHeight * 0.3); // Shadow shrinks as folder rises
              folder.userData.shadow.scale.set(shadowScale, shadowScale, 1);
              folder.userData.shadow.material.opacity = 0.8 * shadowScale; // Fade as it rises
            }
          });

          // Animate particles if any exist
          if (window.animateParticles && particlesRef.current.length > 0) {
            window.animateParticles();
          }

          // Update black lines rotation to follow cube
          if (blackLinesRef.current && cubeGroupRef.current) {
            // Only rotate around Y axis to keep lines from going under the cube
            blackLinesRef.current.rotation.y += 0.008;
          }

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / (window.innerHeight - 88);
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight - 88);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          if (renderer.domElement) {
            renderer.domElement.removeEventListener('click', handleClick);
          }
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
        };
      };

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }, []); // Empty dependency array ensures this runs only once

    // Handle artwork dragging
    const handleArtworkDragStart = (e) => {
      e.preventDefault();
      setIsDraggingArtwork(true);
      setDraggedArtwork({
        name: activeFolder.name,
        url: activeFolder.artworkUrl
      });
      setArtworkPosition({ x: e.clientX, y: e.clientY });
    };

    const handleArtworkDrag = (e) => {
      if (isDraggingArtwork) {
        setArtworkPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleArtworkDrop = (e) => {
      if (!isDraggingArtwork || !cubeGroupRef.current) return;

      // Check if dropped on cube
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = raycasterRef.current;
      const camera = cameraRef.current;
      raycaster.setFromCamera({ x, y }, camera);

      // Check intersection with cube area
      const cubePosition = cubeGroupRef.current.position;
      const distance = raycaster.ray.distanceToPoint(cubePosition);
      
      if (distance < 1.5) { // Within drop zone
        // Get artist-specific colors
        let particleColor = 0xFFD700; // Default gold
        let artistColors = [];
        
        switch (draggedArtwork.name) {
          case 'Basquiat':
            particleColor = 0xFFD700; // Gold/Yellow
            artistColors = [
              [1, 0.84, 0],    // Yellow
              [1, 0, 0],       // Red
              [0.1, 0.1, 0.1]  // Black
            ];
            break;
            
          case 'Picasso':
            particleColor = 0x4169E1; // Royal Blue
            artistColors = [
              [0.25, 0.41, 0.88],  // Blue (Blue Period)
              [0.96, 0.87, 0.70],  // Beige (Cubism)
              [0.55, 0.27, 0.07]   // Brown (African Period)
            ];
            break;
            
          case 'Van Gogh':
            particleColor = 0xFFD700; // Yellow (Sunflowers)
            artistColors = [
              [1, 0.84, 0],      // Sunflower Yellow
              [0, 0, 0.5],       // Starry Night Blue
              [1, 0.55, 0]       // Orange
            ];
            break;
            
          case 'Monet':
            particleColor = 0x87CEEB; // Sky Blue
            artistColors = [
              [0.53, 0.81, 0.92],  // Light Blue (Water)
              [0.98, 0.92, 0.84],  // Cream (Lilies)
              [0.68, 0.85, 0.90]   // Pale Blue
            ];
            break;
            
          case 'Magritte':
            particleColor = 0x87CEEB; // Sky Blue (Surreal skies)
            artistColors = [
              [0.53, 0.81, 0.92],  // Sky Blue
              [0.13, 0.55, 0.13],  // Green (Apples)
              [0.66, 0.66, 0.66]   // Gray (Bowler hats)
            ];
            break;
            
          default:
            artistColors = [
              [0.5, 0.5, 0.5],   // Gray
              [0.7, 0.7, 0.7],   // Light Gray
              [0.3, 0.3, 0.3]    // Dark Gray
            ];
        }
        
        // Create particle explosion with artist color
        if (window.createParticleExplosion) {
          const particles = window.createParticleExplosion(cubePosition, particleColor);
          particlesRef.current = [...particlesRef.current, ...particles];
        }

        // Transform cube colors based on artist
        if (icosahedronRef.current) {
          const colors = [];
          const positionAttribute = icosahedronRef.current.geometry.attributes.position;
          
          for (let i = 0; i < positionAttribute.count; i++) {
            const colorIndex = Math.floor(Math.random() * artistColors.length);
            const color = artistColors[colorIndex];
            colors.push(...color);
          }
          
          icosahedronRef.current.geometry.setAttribute('color', new window.THREE.Float32BufferAttribute(colors, 3));
          icosahedronRef.current.geometry.attributes.color.needsUpdate = true;
        }

        // Create black lines for Basquiat
        if (draggedArtwork.name === 'Basquiat' && !blackLinesRef.current) {
          const linesGroup = new window.THREE.Group();
          
          // Define directions for the six lines
          const directions = [
            new window.THREE.Vector3(1, 0.5, 0.3).normalize(),    // Forward-right-up
            new window.THREE.Vector3(-1, -0.3, 0.5).normalize(),  // Back-left-down
            new window.THREE.Vector3(0.3, 1, -0.4).normalize(),   // Up-forward-left
            new window.THREE.Vector3(-0.5, -1, 0.2).normalize(),  // Down-back-right
            new window.THREE.Vector3(0.7, -0.2, 1).normalize(),   // Right-down-forward
            new window.THREE.Vector3(-0.6, 0.4, -1).normalize(),  // Left-up-back
            new window.THREE.Vector3(0.9, 0.1, -0.7).normalize(), // Right-forward-back
            new window.THREE.Vector3(-0.8, 0.6, 0.4).normalize(), // Left-up-forward
            new window.THREE.Vector3(0.2, -0.9, -0.6).normalize() // Forward-down-back
          ];
          
          // Create black material for lines
          const lineMaterial = new window.THREE.MeshBasicMaterial({ 
            color: 0x000000
          });
          
          directions.forEach((direction, index) => {
            // Create line using a thin cylinder instead of Line for better visibility
            const lineLength = 2.0 + Math.random() * 1.0; // Varying lengths between 2.0-3.0
            const lineGeometry = new window.THREE.CylinderGeometry(0.003, 0.003, lineLength, 4);
            const line = new window.THREE.Mesh(lineGeometry, lineMaterial);
            
            // Position and orient the line
            const endPoint = direction.clone().multiplyScalar(lineLength);
            line.position.copy(direction.clone().multiplyScalar(lineLength / 2));
            
            // Orient the cylinder to point in the right direction
            const up = new window.THREE.Vector3(0, 1, 0);
            const axis = new window.THREE.Vector3().crossVectors(up, direction).normalize();
            const angle = Math.acos(up.dot(direction));
            line.rotateOnAxis(axis, angle);
            
            // Store the target scale for animation
            line.userData.targetScale = 1;
            line.userData.animationProgress = 0;
            line.userData.lineIndex = index;
            
            // Initially hide the line
            line.scale.set(0, 0, 0);
            
            linesGroup.add(line);
            
            // Add price analysis label to the first line
            if (index === 0) {
              // Create label for price analysis
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text - all black with Arial font to match folders
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('PRICE ANALYSIS', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 36px Arial';
              ctx.fillText('$111.2M', 40, 110);
              
              ctx.fillStyle = '#000000';
              ctx.font = '18px Arial';
              ctx.fillText('Confidence: $95M - $127M', 40, 145);
              
              ctx.font = '16px Arial';
              ctx.fillText('Artist reputation: +15%', 40, 180);
              ctx.fillText('Market demand: +8%', 40, 205);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3; // Lowered from 0.5 to make line touch bottom of card
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              linesGroup.add(labelSprite);
            }
            
            // Add comparable sales card to the seventh line
            if (index === 6) {
              // Create label for comparable sales
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('COMPARABLE SALES', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = '16px Arial';
              ctx.fillText('"Untitled" (1982): $110.5M - May 2024', 40, 95);
              ctx.fillText('"In This Case" (1983): $93.1M - Feb 2024', 40, 120);
              ctx.fillText('"Versus Medici" (1982): $50.8M - Nov 2023', 40, 145);
              ctx.fillText('"Flesh and Spirit" (1983): $30.9M - Jun 2023', 40, 170);
              ctx.fillText('Average appreciation: +18.5% annually', 40, 200);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              line.userData.lineIndex = index;
              linesGroup.add(labelSprite);
            }
            
            // Add insurance & storage card to the eighth line
            if (index === 7) {
              // Create label for insurance & storage
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('INSURANCE & STORAGE', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = '18px Arial';
              ctx.fillText('Annual insurance: $334K (0.3%)', 40, 100);
              ctx.fillText('Climate storage: $48K/year', 40, 130);
              ctx.fillText('Security system: $12K/year', 40, 160);
              ctx.fillText('Total annual cost: $394K', 40, 190);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              line.userData.lineIndex = index;
              linesGroup.add(labelSprite);
            }
            
            // Add collector demographics card to the ninth line
            if (index === 8) {
              // Create label for collector demographics
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('COLLECTOR PROFILE', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = '16px Arial';
              ctx.fillText('Tech entrepreneurs: 42%', 40, 95);
              ctx.fillText('Traditional collectors: 31%', 40, 120);
              ctx.fillText('Museums/Institutions: 18%', 40, 145);
              ctx.fillText('Age 35-50: 68% of buyers', 40, 170);
              ctx.fillText('Regions: NYC 45%, LA 22%, London 18%', 40, 195);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              line.userData.lineIndex = index;
              linesGroup.add(labelSprite);
            }
            
            // Add liquidity analysis card to the fifth line
            if (index === 4) {
              // Create label for liquidity analysis
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('LIQUIDITY ANALYSIS', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 36px Arial';
              ctx.fillText('6.8/10', 40, 110);
              
              ctx.fillStyle = '#000000';
              ctx.font = '18px Arial';
              ctx.fillText('Avg. sale time: 3-6 months', 40, 145);
              ctx.fillText('Active buyers: 47 collectors', 40, 170);
              ctx.fillText('Auction frequency: Quarterly', 40, 195);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              linesGroup.add(labelSprite);
            }
            
            // Add market trends card to the sixth line
            if (index === 5) {
              // Create label for market trends
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('MARKET TRENDS', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = '20px Arial';
              ctx.fillText('Neo-Expressionism', 40, 95);
              
              ctx.fillStyle = '#000000';
              ctx.font = '16px Arial';
              ctx.fillText('Demand: Record highs in 2024-25', 40, 125);
              ctx.fillText('Street art influence: +45% value', 40, 150);
              ctx.fillText('Museum acquisitions: Increasing', 40, 175);
              ctx.fillText('Young collectors: 68% interested', 40, 200);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              linesGroup.add(labelSprite);
            }
            
            // Add artwork image card to the third line
            if (index === 2) {
              // Create label for artwork display
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add title
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 28px Arial';
              ctx.fillText('Mind Blowing', 40, 60);
              
              // Create placeholder for image area with border
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 1;
              ctx.strokeRect(40, 80, 150, 135);
              
              // Add text indicating this is Basquiat artwork
              ctx.fillStyle = '#666666';
              ctx.font = '18px Arial';
              ctx.fillText('Jean-Michel Basquiat', 210, 120);
              ctx.fillText('1985', 210, 150);
              ctx.fillText('Acrylic on canvas', 210, 180);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              line.userData.isArtworkCard = true;
              linesGroup.add(labelSprite);
              
              // Load and draw the Basquiat image if available
              if (draggedArtwork && draggedArtwork.url) {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                  // Redraw canvas with image
                  ctx.clearRect(0, 0, 512, 256);
                  
                  // Recreate white background
                  ctx.fillStyle = '#FFFFFF';
                  ctx.fillRect(20, 20, 472, 216);
                  
                  // Create gradient border
                  const gradient = ctx.createLinearGradient(20, 20, 492, 236);
                  gradient.addColorStop(0, '#dc2626');
                  gradient.addColorStop(0.5, '#2563eb');
                  gradient.addColorStop(1, '#dc2626');
                  
                  ctx.strokeStyle = gradient;
                  ctx.lineWidth = 4;
                  ctx.strokeRect(20, 20, 472, 216);
                  
                  // Add title
                  ctx.fillStyle = '#000000';
                  ctx.font = 'bold 28px Arial';
                  ctx.fillText('Mind Blowing', 40, 60);
                  
                  // Draw the image
                  ctx.drawImage(img, 40, 80, 150, 135);
                  
                  // Add border around image
                  ctx.strokeStyle = '#000000';
                  ctx.lineWidth = 1;
                  ctx.strokeRect(40, 80, 150, 135);
                  
                  // Add text
                  ctx.fillStyle = '#666666';
                  ctx.font = '18px Arial';
                  ctx.fillText('Jean-Michel Basquiat', 210, 120);
                  ctx.fillText('1985', 210, 150);
                  ctx.fillText('Acrylic on canvas', 210, 180);
                  
                  // Update texture
                  labelTexture.needsUpdate = true;
                };
                img.onerror = () => {
                  console.log('Failed to load Basquiat image');
                };
                img.src = draggedArtwork.url;
              }
            }
            
            // Add risk factor card to the fourth line
            if (index === 3) {
              // Create label for risk factors
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text - all black with Arial font
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('RISK ASSESSMENT', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 36px Arial';
              ctx.fillText('LOW RISK', 40, 110);
              
              ctx.fillStyle = '#000000';
              ctx.font = '18px Arial';
              ctx.fillText('Provenance: Verified ✓', 40, 145);
              ctx.fillText('Authentication: 98% Confident', 40, 170);
              ctx.fillText('Market: +23% YoY appreciation', 40, 195);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3;
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              linesGroup.add(labelSprite);
            }
            
            // Add ROI score label to the second line
            if (index === 1) {
              // Create label for ROI score
              const labelCanvas = document.createElement('canvas');
              labelCanvas.width = 512;
              labelCanvas.height = 256;
              const ctx = labelCanvas.getContext('2d');
              
              // Clear canvas
              ctx.clearRect(0, 0, 512, 256);
              
              // Create white background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(20, 20, 472, 216);
              
              // Create gradient border
              const gradient = ctx.createLinearGradient(20, 20, 492, 236);
              gradient.addColorStop(0, '#dc2626');
              gradient.addColorStop(0.5, '#2563eb');
              gradient.addColorStop(1, '#dc2626');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 4;
              ctx.strokeRect(20, 20, 472, 216);
              
              // Add text - all black with Arial font
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 24px Arial';
              ctx.fillText('ROI SCORE', 40, 60);
              
              ctx.fillStyle = '#000000';
              ctx.font = 'bold 36px Arial';
              ctx.fillText('9.2/10', 40, 110);
              
              ctx.fillStyle = '#000000';
              ctx.font = '18px Arial';
              ctx.fillText('Annual Return: +18.5%', 40, 145);
              
              ctx.font = '16px Arial';
              ctx.fillText('Liquidity Score: 6.8/10', 40, 180);
              ctx.fillText('Time Horizon: 5-10 years', 40, 205);
              
              const labelTexture = new window.THREE.CanvasTexture(labelCanvas);
              const labelMaterial = new window.THREE.SpriteMaterial({
                map: labelTexture,
                transparent: true,
                opacity: 0
              });
              
              const labelSprite = new window.THREE.Sprite(labelMaterial);
              labelSprite.position.copy(endPoint);
              labelSprite.position.y += 0.3; // Lowered from 0.5 to make line touch bottom of card
              labelSprite.scale.set(2, 1, 1);
              
              line.userData.label = labelSprite;
              linesGroup.add(labelSprite);
            }
          });
          
          // Position the group at the cube's location
          linesGroup.position.y = 0.5; // Same as cube position
          
          sceneRef.current.add(linesGroup);
          blackLinesRef.current = linesGroup;
          
          // Animate lines growing outward
          const animateLines = () => {
            let allComplete = true;
            
            linesGroup.children.forEach((child, index) => {
              if (child.type === 'Mesh' && child.userData.animationProgress !== undefined) {
                const line = child;
                if (line.userData.animationProgress < 1) {
                  allComplete = false;
                  // Stagger the animation start for each line
                  const delay = line.userData.lineIndex * 0.1;
                  const progress = Math.max(0, line.userData.animationProgress - delay);
                  
                  if (progress > 0) {
                    const easeOutQuad = 1 - Math.pow(1 - progress, 2);
                    line.scale.set(1, easeOutQuad, 1);
                    
                    // Fade in labels for all nine lines
                    if (line.userData.label) {
                      line.userData.label.material.opacity = Math.min(easeOutQuad * 1.0, 1.0);
                    }
                  }
                  
                  line.userData.animationProgress += 0.03;
                }
              }
            });
            
            if (!allComplete) {
              requestAnimationFrame(animateLines);
            }
          };
          
          setTimeout(animateLines, 300); // Start after particles begin to fade
        }

        // Reset after drop
        setTimeout(() => {
          setActiveFolder(null);
        }, 500);
      }

      setIsDraggingArtwork(false);
      setDraggedArtwork(null);
    };

    useEffect(() => {
      if (isDraggingArtwork) {
        window.addEventListener('mousemove', handleArtworkDrag);
        window.addEventListener('mouseup', handleArtworkDrop);
        
        return () => {
          window.removeEventListener('mousemove', handleArtworkDrag);
          window.removeEventListener('mouseup', handleArtworkDrop);
        };
      }
    }, [isDraggingArtwork, draggedArtwork]);

    // Handle window dragging
    const handleWindowMouseDown = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDraggingWindow(true);
    };

    const handleWindowMouseMove = (e) => {
      if (isDraggingWindow) {
        setPopupPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleWindowMouseUp = () => {
      setIsDraggingWindow(false);
    };

    useEffect(() => {
      if (isDraggingWindow) {
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
        
        return () => {
          window.removeEventListener('mousemove', handleWindowMouseMove);
          window.removeEventListener('mouseup', handleWindowMouseUp);
        };
      }
    }, [isDraggingWindow, dragOffset]);

    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(to top, #2563eb 0%, #93c5fd 20%, #ffffff 40%)' }}>
        <Header />
        <div ref={mountRef} style={{ width: '100%', height: 'calc(100vh - 88px)', position: 'relative' }} />
        
        {/* Mac-style Finder Popup */}
        {activeFolder && (
          <div
            className="fixed bg-gray-100 rounded-lg shadow-2xl overflow-hidden"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              width: '300px',
              zIndex: 1000,
              cursor: isDraggingWindow ? 'grabbing' : 'auto'
            }}
          >
            {/* Mac window title bar */}
            <div 
              className="bg-gradient-to-b from-gray-300 to-gray-400 px-3 py-2 flex items-center justify-between cursor-grab active:cursor-grabbing"
              onMouseDown={handleWindowMouseDown}
            >
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFolder(null);
                  }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                />
                <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
              </div>
              <span className="text-xs font-medium text-gray-700 select-none">{activeFolder.name}</span>
              <div className="w-14" /> {/* Spacer for centering */}
            </div>
            
            {/* Content area */}
            <div className="bg-white p-4">
              <div className="bg-gray-50 rounded-lg p-2 mb-2">
                <img
                  src={activeFolder.artworkUrl}
                  alt={`${activeFolder.name} artwork`}
                  className="w-full h-48 object-contain rounded cursor-move"
                  onMouseDown={handleArtworkDragStart}
                  draggable={false}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">{activeFolder.name}</p>
                <p className="text-xs text-gray-500 mt-1">Click and drag image to cube</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Dragging artwork ghost image */}
        {isDraggingArtwork && draggedArtwork && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: artworkPosition.x - 50,
              top: artworkPosition.y - 50
            }}
          >
            <img
              src={draggedArtwork.url}
              alt="Dragging artwork"
              className="w-24 h-24 object-cover opacity-70 rounded shadow-lg"
            />
          </div>
        )}
      </div>
    );
  };

  // Try Vasari Page Component
  const TryVasariPage = () => (
    <div className="min-h-screen bg-white">
      <Header />
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

  // Main render logic
  if (currentPage === 'landing') {
    return <LandingPage />;
  } else if (currentPage === 'vasari-v01') {
    return <VasariV01Page />;
  } else if (currentPage === 'try-vasari') {
    return <TryVasariPage />;
  } else if (currentPage === 'evaluation') {
    return <EvaluationPage />;
  }

  // Default to landing page
  return <LandingPage />;
};

export default VasariPlatform;